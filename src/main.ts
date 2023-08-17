import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ClusterService } from './app.cluster.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.use(helmet());
	app.useGlobalPipes(new ValidationPipe());
	const configService = app.get(ConfigService);
	const port = configService.get<number>('API_PORT');
	await app.listen(port);
}
//bootstrap();
ClusterService.clusterize(bootstrap);
