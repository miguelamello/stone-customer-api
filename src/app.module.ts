import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { SsoModule } from './sso/sso.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { LoggerService } from './logging/logger.service';
import { ReferenceModule } from './reference/reference.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, cache: true }),
		ThrottlerModule.forRoot({ ttl: 60, limit: 100 }),
		CustomerModule,
		RedisModule,
		SsoModule,
		AuthModule,
		ReferenceModule,
	],
	controllers: [AppController],
	providers: [AppService, LoggerService],
})
export class AppModule {}
