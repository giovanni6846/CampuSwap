// src/user/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UsersResponseDto {
   @ApiProperty({})
   username!: string;

   @ApiProperty({})
   email!: string;

   @ApiProperty({})
   activities!: [];
}
