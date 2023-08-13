import { HttpException } from '@nestjs/common';

export class CacheUnavailableException extends HttpException {
	constructor() {
		super('cache indisponivel', 502);
	}
}
