// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FindUserDto {
   @ApiProperty({
      description: 'Rechercher utilisatuer via ID',
      example: '12345',
   })
   @IsMongoId()
   id!: string;
}

export class UserResponseDto {
   @ApiProperty({})
   username!: string;

   @ApiProperty({})
   email!: string;

   @ApiProperty({})
   activities!: string[];
}
