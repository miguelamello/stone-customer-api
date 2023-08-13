import {
	ExceptionFilter,
	Catch,
	ArgumentsHost,
	HttpException,
	BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class BadRequestFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const status = exception.getStatus();
		const original = exception.getResponse();

		if (exception instanceof BadRequestException) {
			response.status(status).json({
				message: original['message'],
				statusCode: status,
				error: 'request inválida',
			});
		} else {
			response.status(status).json({
				statusCode: status,
				error: original,
			});
		}
	}
}
