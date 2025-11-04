import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '../user/user.module';
import { SyncController } from './sync.controller';
import { SyncService } from './sync.service';
import {ActivitiesModule} from "../activities/activities.module";

@Module({
   imports: [ActivitiesModule, UserModule],
   controllers: [SyncController],
   providers: [SyncService],
   exports: [SyncService],
})
export class SyncModule {}
