import { HttpException } from '@nestjs/common';

export class SsoUnavailableException extends HttpException {
	constructor() {
		super('sso indisponivel', 503);
	}
}
