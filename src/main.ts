import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Projeto CRM')
  .setDescription('Projeto CRM')
  .setContact("Generation Brasil","http://www.generationbrasil.online","generation@email.com")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
    
  process.env.TZ = '-03:00'; // Configuramos o fuso-horário

  app.useGlobalPipes(new ValidationPipe()); // Habilitamos o Validation Globalmente

  app.enableCors(); // Habilitamos requisições de outras origens (Servidores)

  await app.listen(4000);

}
bootstrap();
