import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

@Module({
   imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
   controllers: [UserController],
   providers: [UsersService],
   exports: [MongooseModule, UsersService],
})
export class UserModule {}
