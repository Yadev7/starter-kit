import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Global Prefix (Standard practice: /api/v1)
  app.setGlobalPrefix('api/v1');

  // 2. Global Validation (Senior move: auto-transform payloads)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // 3. Swagger Documentation Setup
  const config = new DocumentBuilder()
    .setTitle('Starter Kit')
    .setDescription('The foundation for my SaaS empire')
    .setVersion('1.0')
    .addBearerAuth() // Allows testing JWTs in UI
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // 4. Enable CORS for your Next.js apps
  app.enableCors();

  await app.listen(process.env.PORT || 3000);
}
bootstrap();