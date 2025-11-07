import {Body, Controller, Get, HttpCode, HttpStatus, Post, Query} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InscriptionResponseDto, InscriptionUserDto } from '../auth/dto/inscription';
import { AuthService } from './auth.service';
import { AuthPayloadAuthDto, AuthResponseDto } from './dto/auth_login';

@ApiTags('login')
@Controller('login')
export class AuthController {
   constructor(private readonly AuthService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post()
   async Login(@Body() body: AuthPayloadAuthDto): Promise<AuthResponseDto> {
      return this.AuthService.Login(body.email, body.password);
   }

    @Get('validation')
    async validation(@Query('token') token: string):Promise<void> {
        return this.AuthService.Validation(token);
    }

   @Post('inscription')
   async Inscription(@Body() body: InscriptionUserDto): Promise<InscriptionResponseDto> {
      return this.AuthService.Inscription(body.email, body.password, body.username);
   }
}
