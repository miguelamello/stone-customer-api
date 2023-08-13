import { Injectable } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService {
	private logger: winston.Logger;

	constructor() {
		this.logger = winston.createLogger({
			transports: [], // Add transports here
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.json(),
			),
		});
	}

	error(message: string, trace: string) {
		this.logger.error(message, { trace });
	}

	log(message: string) {
		this.logger.info(message);
	}
}
