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

import { ActivitiesModule } from './activities/activities.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';
import { UserModule } from './user/user.module';
import {SyncModule} from "./sync/sync.module";

@Module({
   imports: [
      //Démarrage de la connexion à la base de données
      MongooseModule.forRoot(
         `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongo:27017/campuswap?authSource=admin`,
      ),
      UserModule,
      ActivitiesModule,
      StatusModule,
      AuthModule,
      SyncModule,
   ],
   controllers: [],
   providers: [],
})
export class AppModule {}
