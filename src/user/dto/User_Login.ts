import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class UserLogin {
   @ApiProperty({})
   @IsMongoId()
   _id!: string;

   @ApiProperty({})
   password!: string;
}

export class UserLoginResponse {
   @ApiProperty({})
   @IsMongoId()
   user_Id!: string;

   @ApiProperty({})
   @IsString()
   message!: string;
}
