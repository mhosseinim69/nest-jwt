import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Category with JWT ')
    .setDescription('The categories API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token')
    .addServer('http://localhost:3000/', 'Local environment')
    .addTag('Categories')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  });
  await app.listen(3000);
}
bootstrap();
