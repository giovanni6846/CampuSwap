// src/user/dto/create-user.dto.ts
import { IsMongoId, IsString } from 'class-validator';

export class FindUserDto {
   @IsMongoId()
   id!: string;
}

export class UserResponseDto {
  success!: boolean;
  message!: string;
  user?: any;
}