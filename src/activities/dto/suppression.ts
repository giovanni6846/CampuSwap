import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SuppressionDto {
   @ApiProperty({
      description: "L'identifiant de l'utilisateur",
      example: '68c01799de4eba6627c764f9',
   })
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   id_user!: string;

   @ApiProperty({
      description: "L'identifiant de l'activité",
      example: '68c01799de4eba6627c764f6',
   })
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   id_activities!: string;
}

export class SuppressionResponseDto {
   @ApiProperty({})
   @IsString()
   @IsNotEmpty()
   message!: string;
}
