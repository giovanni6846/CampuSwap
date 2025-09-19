import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InscriptionUserDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   email!: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   password!: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   username!: string;
}

export class InscriptionResponseDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   message!: string;
}
