import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsMongoId, IsNotEmpty } from 'class-validator';

export class InscriptionDto {
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

   /*@ApiProperty({
        description: "Jeton JWT d'authentification",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        required: false,
    })
    @IsString()
    jwt?: string;*/
}
