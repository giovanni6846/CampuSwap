import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ValidationDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsMongoId()
   id_user!: string;
}

export class ValidationResponseDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   message!: string;
}
