import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SsoService } from '../sso/sso.service';
import { ExceptionService } from '../exception/exception.service';
import { LoggerService } from '../logging/logger.service';

@Module({
	controllers: [AuthController],
	providers: [AuthService, SsoService, ExceptionService, LoggerService],
	exports: [AuthService, SsoService],
})
export class AuthModule {}
