import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import {ActivitiesModule} from "../activities/activities.module";

@Module({
   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
   ActivitiesModule],
   controllers: [UserController],
   providers: [UsersService],
   exports: [MongooseModule, UsersService],
})
export class UserModule {}
