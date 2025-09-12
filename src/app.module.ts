/******************************************************************
 * Programme: app.module.ts                                        *
 * Version: 1.0.0                                                  *
 * Auteur: Giovanni                                                *
 * Description: Programme de centralisation de toute les           *
 * dépendance programme nécessaire                                 *
 *                                                                 *
 *******************************************************************
 *                                                                 *
 *                                                                 *
 *                                                                 *
 *                                                                 *
 *                                                                 *
 *******************************************************************/

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from './user/user.module';

@Module({
   imports: [
      //Démarrage de la connexion à la base de données
      MongooseModule.forRoot(
         `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/campuswap?authSource=admin`,
      ),
      UserModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
