import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { SsoModule } from '../sso/sso.module';
import { AuthModule } from '../auth/auth.module';
import { ExceptionService } from '../exception/exception.service';
import { LoggerService } from '../logging/logger.service';

@Module({
	controllers: [CustomerController],
	providers: [CustomerService, ExceptionService, LoggerService],
	imports: [SsoModule, AuthModule],
})
export class CustomerModule {}
