import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./constantes";

@Module({
   imports: [UserModule,
       JwtModule.register({
       global: true,
       secret: jwtConstants.secret,
       signOptions: { expiresIn: '1h' },
   }),],
   controllers: [AuthController],
   providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
