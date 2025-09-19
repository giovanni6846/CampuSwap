import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class ModerationDto {
   @ApiProperty({})
   @IsString()
   @IsMongoId()
   @IsNotEmpty()
   id_user!: string;

   @ApiProperty({})
   @IsString()
   @IsMongoId()
   @IsNotEmpty()
   id_activities!: string;

   @ApiProperty({})
   @IsString()
   @IsNotEmpty()
   motif!: string;

   @ApiProperty({})
   @IsBoolean()
   @IsNotEmpty()
   moderation!: boolean;

   @ApiProperty({
         description: "Jeton JWT d'authentification",
         example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     })
     @IsString()
     @IsNotEmpty()
     jwt!: string;
}

export class ModerationResponseDto {
   @ApiProperty({})
   @IsNotEmpty()
   @IsString()
   message!: string;

   @ApiProperty({})
   @IsNotEmpty()
   @IsString()
   motif!: string;
}
