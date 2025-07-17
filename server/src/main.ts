(global as any).crypto = require('crypto');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,  // <- Esto activa las transformaciones
  }));
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });
   app.enableCors({
    origin: 'http://localhost:5173', // o ['http://localhost:5173'] si usás más de un origen
    credentials: true, // si estás usando cookies o Authorization headers
  });
  await app.listen(3000);
}
bootstrap();
