import { Reflector } from '@nestjs/core';
import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { urlencoded, json } from 'express';

export function createCommonServerStart(app: INestApplication) {
  app
    .setGlobalPrefix('api')
    .use(json({ limit: '1gb' }))
    .use(urlencoded({ extended: true, limit: '1gb' }))
    .enableVersioning({ type: VersioningType.URI })
    .useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }))
    .useGlobalInterceptors(
      new ClassSerializerInterceptor(new Reflector(), {
        strategy: 'excludeAll',
      }),
    );
}
