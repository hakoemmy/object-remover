import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { EVK, NODE_ENV } from './__helpers__';
import { createCommonServerStart, createSwaggerDocs } from './__bootstrap__';

const environment = process.env[EVK.NODE_ENV];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createCommonServerStart(app);

  const config = app.get(ConfigService);

  if (environment === NODE_ENV.DEV || environment === NODE_ENV.STAGE) {
    createSwaggerDocs(app);
  }

  await app.listen(config.get(EVK.PORT));
}
bootstrap();
