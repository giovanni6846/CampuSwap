import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActivitiesController } from './activities.controller';
import { ActivitiesService } from './activities.service';
import { Activities, ActivitiesSchema } from './schemas/activities.schema';

@Module({
   imports: [MongooseModule.forFeature([{ name: Activities.name, schema: ActivitiesSchema }])],
   controllers: [ActivitiesController],
   providers: [ActivitiesService],
   exports: [MongooseModule, ActivitiesService],
})
export class ActivitiesModule {}
