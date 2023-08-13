import { Module, Global } from '@nestjs/common';
import { SsoService } from './sso.service';
import { ExceptionService } from '../exception/exception.service';
import { LoggerService } from '../logging/logger.service';
import axios from 'axios';

@Global()
@Module({
	providers: [
		{
			provide: 'AXIOS_CLIENT',
			useFactory: () => {
				return axios.create({
					baseURL: 'https://accounts.seguros.vitta.com.br',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});
			},
		},
		SsoService,
		ExceptionService,
		LoggerService,
	],
	exports: ['AXIOS_CLIENT'],
})
export class SsoModule {}
