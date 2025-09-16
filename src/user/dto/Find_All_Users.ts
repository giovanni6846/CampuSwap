// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDto {
   @ApiProperty({})
   _id!: string;

    @ApiProperty({})
   username!: string;

   @ApiProperty({})
   email!: string;

   @ApiProperty({})
   activities!: [];
}
