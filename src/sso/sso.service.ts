import { Injectable, Inject } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { ExceptionService } from '../exception/exception.service';
import { NotAuthorizedException } from '../exception/exception.not.authorized';
import { SsoUnavailableException } from '../exception/exception.sso.unavailable';

@Injectable()
export class SsoService {
	constructor(
		private readonly exceptionService: ExceptionService,
		@Inject('AXIOS_CLIENT') private readonly axiosClient: AxiosInstance,
	) {}

	// Encodes a string to base64
	private encodeToBase64(inputString: string): string {
		const buffer = Buffer.from(inputString, 'utf-8');
		const base64Encoded = buffer.toString('base64');
		return base64Encoded;
	}

	// Verify if a string is a JWT token
	isJWTToken(token: string): boolean {
		const segments = token.split('.');
		return segments.length === 3;
	}

	// Get a token from SSO
	async authToken(email: string): Promise<any> {
		try {
			const response = await this.axiosClient.post(
				'/auth/realms/careers/protocol/openid-connect/token',
				{
					grant_type: 'client_credentials',
					client_id: 'customers',
					client_secret: '453000f7-47a0-4489-bc47-891c742650e2',
					username: email,
					password: this.encodeToBase64(email),
					scope: 'openid',
				},
			);
			if (!this.isJWTToken(response.data.access_token)) {
				throw new NotAuthorizedException();
			}
			return response.data.access_token;
		} catch (error) {
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			return new SsoUnavailableException();
		}
	}
}
