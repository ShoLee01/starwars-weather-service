import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { JwtAuthGuard } from './security/jwt-auth.guard';

async function main() {
  const app = await NestFactory.create(AppModule);
  // Pipes validated
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Prefix url
  app.setGlobalPrefix('api/v1');

  // Habilitar consultas anonimas
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));

  // Swagger
    const config = new DocumentBuilder()
    .setTitle('ms-starwars-weather')
    .setDescription('API para el reto de Softtec')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('/api/v1')
    .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/docs', app, documentFactory, {
      jsonDocumentUrl: 'swagger/json',
      yamlDocumentUrl: 'swagger/yaml',
      swaggerOptions: { persistAuthorization: true },
    });


  // Local
  await app.listen(process.env.PORT ?? 3000);
  // Nube
  //const port = process.env.PORT || 3000;
  //await app.listen(port, '0.0.0.0');
}
void main();
