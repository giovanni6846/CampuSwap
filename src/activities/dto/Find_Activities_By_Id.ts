import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class Enter_Activity {
   @ApiProperty({ example: '68c4158f2862b6fbf1fb9000' })
   @IsString()
   @IsNotEmpty()
   @IsMongoId()
   id!: string;

}

export class ActivityResponseDto {
   @ApiProperty({ example: '68c4158f2862b6fbf1fb9000', description: 'MongoDB ObjectId' })
   _id!: string | Types.ObjectId;
   @ApiProperty({ example: 'Cours de mathématiques' })
   name!: string;

   @ApiProperty({ example: 'Programme 2ème année' })
   description!: string;

   @ApiProperty({ example: '2025-09-15T09:00:00Z' })
   datdeb!: Date;

   @ApiProperty({ example: '2025-09-15T11:00:00Z' })
   datfin!: Date;

   @ApiProperty({ example: 10 })
   seat!: number;
}
