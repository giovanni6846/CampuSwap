import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../user/user.service';
import { AuthResponseDto } from './dto/auth_login';
import { InscriptionResponseDto } from './dto/inscription';
import { ValidationResponseDto } from './dto/validation_login';
import { MailService} from "../mail/mail.service";
import jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
   constructor(
      private readonly UsersService: UsersService,
      private jwtService: JwtService,
      private readonly mailService: MailService,
   ) {}

   async Login(email: string, password: string): Promise<AuthResponseDto> {
      const user = await this.UsersService.login(email, password);

      const payload = { email_user: email };
      const access_token = await this.jwtService.signAsync(payload);
      return {
         token: access_token,
         user_Id: user.user_Id,
         message: user.message,
         isAdmin: user.isAdmin,
      };
   }

    async Validation(token: string):Promise<void> {
        const payload = this.jwtService.verify(token);

        const userId = payload.id_user;

        const email = await this.UsersService.findUserValidated(userId);

        await this.mailService.sendResponseActivationEmail(email.email);

    }

   async Inscription(
      email: string,
      password: string,
      username: string,
   ): Promise<InscriptionResponseDto> {
      if (password.length < 12) {
         throw new Error('Le mot de passe doit contenir au moins 12 caractères.');
      }
      if (!/[A-Z]/.test(password)) {
         throw new Error('Le mot de passe doit contenir au moins une majuscule.');
      }
      if (!/[a-z]/.test(password)) {
         throw new Error('Le mot de passe doit contenir au moins une minuscule.');
      }
      if (!/[0-9]/.test(password)) {
         throw new Error('Le mot de passe doit contenir au moins un chiffre.');
      }
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
         throw new Error('Le mot de passe doit contenir au moins un caractère spécial.');
      }

      const user = await this.UsersService.inscription(email, password, username);

       jwt.sign({ id_user: user.id_user }, 's0vyuKByX43XgiINVr7RjScAHYu6g4', {
           expiresIn: '15m',
       });

       const payload = { id_user: user.id_user };
       const access_token = await this.jwtService.signAsync(payload);

      await this.mailService.sendActivationEmail(email, access_token);

      return {
         message: user.message,
      };
   }
}
