import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthPayloadAuthDto {
   @ApiProperty({})
   @IsNotEmpty()
   email!: string;

   @ApiProperty({})
   @IsNotEmpty()
   password!: string;
}

export class AuthResponseDto {
   @ApiProperty({})
   @IsNotEmpty()
   token!: string;

   @ApiProperty({})
   @IsNotEmpty()
   message!: string;
}
