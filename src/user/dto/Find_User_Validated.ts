// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserValidatedResponseDto {
   @ApiProperty({})
   @IsMongoId()
   _id!: string;

   @ApiProperty({})
   email!: string;

   @ApiProperty({})
   IsValidate!: boolean;
}
