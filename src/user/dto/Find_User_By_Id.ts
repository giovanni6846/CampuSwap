// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class FindUserDto {
   @ApiProperty({
      description: 'Rechercher utilisatuer via ID',
      example: '12345',
   })
   @IsMongoId()
   id!: string;
}

export class UserResponseDto {
   success!: boolean;
   message!: string;
   user?: any;
}
