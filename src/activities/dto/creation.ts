import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreationDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   name!: string;

   @ApiProperty()
   @IsDateString()
   @IsNotEmpty()
   datdeb!: Date;

   @ApiProperty()
   @IsDateString()
   @IsNotEmpty()
   datfin!: Date;

   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   description!: string;

   @ApiProperty()
   @IsInt()
   @IsNotEmpty()
   seats!: string;

   @ApiProperty()
   @IsMongoId()
   @IsNotEmpty()
   user_created!: string;
}

export class CreationResponseDto {
   @ApiProperty()
   @IsString()
   @IsNotEmpty()
   message!: string;
}
