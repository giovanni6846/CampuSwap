import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class SearchActivitiesDto {
   @ApiProperty({
      description: 'Date de début de la recherche',
      example: '2025-09-15T09:00:00Z',
      required: false,
   })
   @IsOptional()
   @IsDateString()
   start?: string;

   @ApiProperty({
      description: 'Date de fin de la recherche',
      example: '2025-09-20T11:00:00Z',
      required: false,
   })
   @IsOptional()
   @IsDateString()
   end?: string;

   @ApiProperty({
      description: "Nom de l'activité",
      example: 'Mathématiques',
      required: false,
   })
   @IsOptional()
   @IsString()
   name?: string;

   /*@ApiProperty({
        description: "JWT d'authentification",
        required: false,
    })
    @IsOptional()
    @IsString()
    jwt?: string;*/
}
