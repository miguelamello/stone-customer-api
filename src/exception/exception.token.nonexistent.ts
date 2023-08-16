import { HttpException } from '@nestjs/common';

export class TokenNonexistentException extends HttpException {
	constructor() {
		super('token inexistente', 405);
	}
}
