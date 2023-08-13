import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { AxiosInstance } from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { CacheUnavailableException } from '../exception/exception.cache.unavailable';
import { CustomerNonexistentException } from '../exception/exception.customer.nonexistent';
import { ExceptionService } from '../exception/exception.service';
import { CustomerBodyDto } from './customer.dto';

@Injectable()
export class CustomerService {
	private readonly ttl: number;

	constructor(
		private readonly exceptionService: ExceptionService,
		private readonly configService: ConfigService,
		@Inject('REDIS_CLIENT') private readonly redisClient: Redis,
		@Inject('AXIOS_CLIENT') private readonly axiosClient: AxiosInstance,
	) {
		this.ttl = this.configService.get<number>('REDIS_TTL'); // Key exipiration time in seconds. See .env file
	}

	// Update the customer associated with the id
	async putCostumer(
		id: string,
		customerBodyDto: CustomerBodyDto,
	): Promise<void> {
		try {
			// Check if the customer exists
			const key = 'customer:' + id;
			const result_get1 = await this.redisClient.get(key);
			if (!result_get1) {
				throw new CustomerNonexistentException();
			}
			// Update the customer
			const customer = {
				id: id,
				document: customerBodyDto.document,
				name: customerBodyDto.name,
			};
			const result_set = await this.redisClient.set(key, JSON.stringify(customer));
			if (result_set !== 'OK') {
				throw new CacheUnavailableException();
			}
			// Check if the customer was updated
			const result_get2 = await this.redisClient.get(key);
			if (!result_get2) {
				throw new CustomerNonexistentException();
			}
			return JSON.parse(result_get2);
		} catch (error) {
			// Handle errors
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			throw new CacheUnavailableException();
		}
	}

	// Create a new customer
	async postCostumer(customerBodyDto: CustomerBodyDto): Promise<void> {
		try {
			// Create a new UUID and save the customer
			const uuid = uuidv4();
			const customer = {
				id: uuid,
				document: customerBodyDto.document,
				name: customerBodyDto.name,
			};
			const key = 'customer:' + uuid;
			const result_set = await this.redisClient.set(key, JSON.stringify(customer));
			if (result_set !== 'OK') {
				throw new CacheUnavailableException();
			}
			// Check if the customer was saved
			const result_get = await this.redisClient.get(key);
			if (!result_get) {
				throw new CustomerNonexistentException();
			}
			return JSON.parse(result_get);
		} catch (error) {
			// Handle errors
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			throw new CacheUnavailableException();
		}
	}

	// Get the customer associated with the key
	async getCostumer(key: string): Promise<any> {
		try {
			const result = await this.redisClient.get('customer:' + key);
			if (!result) {
				throw new CustomerNonexistentException();
			}
			return JSON.parse(result);
		} catch (error) {
			// Handle errors
			if (this.exceptionService.handleError(error)) {
				throw error;
			}
			throw new CacheUnavailableException();
		}
	}
}
