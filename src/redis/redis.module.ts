import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Global()
@Module({
	providers: [
		{
			provide: 'REDIS_CLIENT',
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				return new Redis({
					host: configService.get<string>('REDIS_HOST'), // Set in process.env.REDIS_HOST
					port: configService.get<number>('REDIS_PORT'), // Set in process.env.REDIS_PORT
					connectTimeout: 3000, // The milliseconds before a timeout occurs during the initial connection to the Redis server.
					commandTimeout: 3000, // Timeout in milliseconds (1 second)
				});
			},
		},
	],
	exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
