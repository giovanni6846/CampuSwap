import { ApiTags } from '@nestjs/swagger';
import { InscriptionResponseDto, InscriptionUserDto } from '../auth/dto/inscription';
import { AuthService } from './auth.service';
import { AuthPayloadAuthDto, AuthResponseDto } from './dto/auth_login';
import { ValidationDto, ValidationResponseDto } from './dto/validation_login';
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@ApiTags('login')
@Controller('login')
export class AuthController {
   constructor(private readonly AuthService: AuthService) {}

   @HttpCode(HttpStatus.OK)
   @Post()
   async Login(@Body() body: AuthPayloadAuthDto): Promise<AuthResponseDto> {
      return this.AuthService.Login(body.email, body.password);
   }

   @Post('validation')
   async Validation(@Body() body: ValidationDto): Promise<ValidationResponseDto> {
      return this.AuthService.Validation(body.id_user);
   }

   @Post('inscription')
   async Inscription(@Body() body: InscriptionUserDto): Promise<InscriptionResponseDto> {
      return this.AuthService.Inscription(body.email, body.password, body.username);
   }
}
