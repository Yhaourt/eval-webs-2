import { NestFactory } from '@nestjs/core';
import { RestModule } from './rest.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(RestModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.port ?? 3001);
}

bootstrap();
