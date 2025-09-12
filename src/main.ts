/******************************************************************
* Programme: main.ts                                              *
* Version: 1.0.0                                                  *
* Auteur: Giovanni                                                *
* Description: Programme de démarage de l'API                     *
*                                                                 *
*                                                                 *
*******************************************************************
*                                                                 *
*                                                                 *
*                                                                 *
*                                                                 *
*                                                                 *
*******************************************************************/


import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   await app.listen(process.env.PORT ?? 3000);
   app.useGlobalPipes(
      new ValidationPipe({
         whitelist: true,
         forbidNonWhitelisted: true,
         transform: true,
      }),
   );
}
bootstrap();
