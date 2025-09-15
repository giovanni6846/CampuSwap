import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, ActivitiesSchema } from './schemas/activities.schema';
import { ActivitiesController } from './activities.controller';
import { UsersService } from './activities.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: User.name, schema: ActivitiesSchema }])],
   controllers: [ActivitiesController],
   providers: [UsersService],
   exports: [MongooseModule, UsersService],
})
export class ActivitiesModule {}
