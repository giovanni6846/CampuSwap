// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class UserActivities {
   @ApiProperty({})
   @IsMongoId()
   _id!: string;

   @ApiProperty({})
   username!: string;

   @ApiProperty({})
   email!: string;

   @ApiProperty({})
   isBlock!: boolean;

   @ApiProperty({})
   activities!: string[];

   @ApiProperty({})
   IsValidated!: boolean;
}
