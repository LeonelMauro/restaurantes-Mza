import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
