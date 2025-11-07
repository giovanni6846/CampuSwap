import { ApiProperty } from '@nestjs/swagger';
import {IsMongoId, IsNotEmpty, IsString} from 'class-validator';

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

export class InscriptionResponseDto_Activation {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    message!: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsMongoId()
    id_user!: string;
}