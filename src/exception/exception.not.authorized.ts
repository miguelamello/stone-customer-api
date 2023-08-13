import { HttpException } from '@nestjs/common';

export class NotAuthorizedException extends HttpException {
	constructor() {
		super('não autorizado', 401);
	}
}
