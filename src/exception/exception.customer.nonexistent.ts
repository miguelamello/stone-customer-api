import { HttpException } from '@nestjs/common';

export class CustomerNonexistentException extends HttpException {
	constructor() {
		super('cliente inexistente', 404);
	}
}
