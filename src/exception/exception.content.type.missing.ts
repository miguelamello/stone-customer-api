import { HttpException } from '@nestjs/common';

export class ContentTypeMissingException extends HttpException {
	constructor() {
		super("header 'Content-Type: application/json' ausente", 402);
	}
}
