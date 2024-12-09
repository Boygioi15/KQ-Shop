import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors = require('cors');

  app.useGlobalPipes(new ValidationPipe());
  app.use(cors());
  app.enableCors({
    origin: 'http://localhost:5173', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 8000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
