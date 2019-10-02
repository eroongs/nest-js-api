import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

import { VALIDATION_PIPE } from './app.config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true });

	app.useGlobalPipes(VALIDATION_PIPE);
	app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
	app.setGlobalPrefix('api');

	await app.listen(3000);
}

bootstrap();
