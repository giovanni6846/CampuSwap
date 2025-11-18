import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class UserLogin {
   @ApiProperty({})
   @IsMongoId()
   _id!: string;

   @ApiProperty({})
   password!: string;

    @ApiProperty({})
    isAdmin!: boolean;
}

export class UserLoginResponse {
   @ApiProperty({})
   @IsMongoId()
   user_Id!: string;

   @ApiProperty({})
   @IsString()
   message!: string;

    @ApiProperty({})
    isAdmin!: boolean;
}
