/******************************************************************
 * Programme: main.ts                                              *
 * Version: 1.0.0                                                  *
 * Auteur: Giovanni                                                *
 * Description: Programme de démarrage de l'API avec Swagger        *
 *******************************************************************/

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
   const app = await NestFactory.create(AppModule);

   // 🔹 Configuration Swagger
   const config = new DocumentBuilder()
      .setTitle('APISWAP')
      .setDescription('Documentation de APISWAP')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

   const document = SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, document);

   // 🔹 Validation globale
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      }),
   );

   await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
