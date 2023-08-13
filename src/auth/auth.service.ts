import {
	Injectable,
	Inject,
	InternalServerErrorException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { createHmac } from 'node:crypto';
import { SsoService } from '../sso/sso.service';
import { ExceptionService } from '../exception/exception.service';
import { CacheUnavailableException } from '../exception/exception.cache.unavailable';
import { TokenNonexistentException } from '../exception/exception.token.nonexistent';

@Injectable()
export class AuthService {
	private readonly ttl: number;
	private readonly secretKey: string;

	constructor(
		private readonly ssoService: SsoService,
		private readonly exceptionService: ExceptionService,
		private readonly configService: ConfigService,
		@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
	) {
		this.ttl = this.configService.get<number>('REDIS_TTL'); // Key exipiration time in seconds. See .env file
		this.secretKey = this.configService.get<string>('SECRET_KEY'); // Secret key to generate hash. See .env file
	}

	// Generate a 64 characters hash from token string
	private makeHash(token: string): string {
		const hash = createHmac('sha256', this.secretKey).update(token).digest('hex');
		return hash;
	}

	// Verify if a property of an object is an integer
	private isIntegerProperty(obj: object, propertyName: string): boolean {
		if (obj.hasOwnProperty(propertyName)) {
			return (
				typeof obj[propertyName] === 'number' && Number.isInteger(obj[propertyName])
			);
		}
		return false;
	}

	// Get the token associated with the hash
	async getHashedToken(token: string): Promise<any> {
		try {
			const hash = this.makeHash(token);
			const result = await this.redisClient.get('hash:' + hash);
			if (!result) {
				return '';
			}
			return result;
		} catch (error) {
			return '';
		}
	}

	// Get the token associated with the email
	async getAuth(email: string): Promise<any> {
		try {
			const result = await this.redisClient.get('token:' + email);
			if (!result) {
				throw new TokenNonexistentException();
			}
			return { bearer_token: result };
		} catch (error) {
			// Handle errors
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			throw new CacheUnavailableException();
		}
	}

	// Create a new token and store it in Redis
	async setAuth(email: string): Promise<any> {
		try {
			// Get a new token from SSO or throw an error
			const token = await this.ssoService.authToken(email);
			if (this.isIntegerProperty(token, 'status')) {
				throw token;
			}
			// Store the token in Redis
			const result_set1 = await this.redisClient.set(
				'token:' + email,
				token,
				'EX',
				this.ttl,
			);
			if (result_set1 !== 'OK') {
				throw new CacheUnavailableException();
			}
			// Store the hash of the token in Redis
			// This avoid too many round trips to SSO
			const hash = this.makeHash(token);
			const result_set2 = await this.redisClient.set(
				'hash:' + hash,
				token,
				'EX',
				this.ttl,
			);
			if (result_set2 !== 'OK') {
				// If the hash is not stored, delete the token
				this.redisClient.del('token:' + email);
				throw new CacheUnavailableException();
			}
			return { bearer_token: token };
		} catch (error) {
			// Handle errors
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			throw new InternalServerErrorException();
		}
	}
}
