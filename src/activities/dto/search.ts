import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

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
}

export class SearchActivitiesResponseDto {
   @ApiProperty({})
   @IsMongoId()
   _id!: string | ObjectId;

   @ApiProperty({})
   name!: string;

   @ApiProperty({})
   description!: string;

   @ApiProperty({})
   @IsMongoId()
   user_created!: string | ObjectId;

   @ApiProperty({})
   datdeb!: Date;

   @ApiProperty({})
   datfin!: Date;
}
