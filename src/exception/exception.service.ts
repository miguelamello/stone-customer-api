import { Injectable } from '@nestjs/common';
import { LoggerService } from '../logging/logger.service';
import { NotAuthorizedException } from './exception.not.authorized';
import { SsoUnavailableException } from './exception.sso.unavailable';
import { CacheUnavailableException } from './exception.cache.unavailable';
import { TokenNonexistentException } from './exception.token.nonexistent';
import { CustomerNonexistentException } from './exception.customer.nonexistent';

@Injectable()
export class ExceptionService {
	constructor(private readonly loggerService: LoggerService) {}
	handleError(error: Error) {
		if (
			error instanceof NotAuthorizedException ||
			error instanceof SsoUnavailableException ||
			error instanceof CacheUnavailableException ||
			error instanceof TokenNonexistentException ||
			error instanceof CustomerNonexistentException
		) {
			if (error instanceof SsoUnavailableException) {
				// SSO errors shall be logged
				// this.loggerService.error(error.message, error.stack);
			}
			return true;
		} else {
			// All orther errors are logged
			// this.loggerService.error(error.message, error.stack);
			return false;
		}
	}
}
