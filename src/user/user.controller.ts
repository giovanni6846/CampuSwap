import {Controller, Get, Param, UseGuards} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { FindUserDto, UserResponseDto } from './dto/Find_User_By_Id';
import { UsersService } from './user.service';
import {AuthGuard} from "../auth/auth.guard";

@ApiTags('user')
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
   constructor(private readonly _UserService: UsersService) {}

   @Get(':id')
   @ApiParam({
      name: 'id',
      description: "L'identifiant de l'utilisateur",
      example: '68c415892862b6fbf1fb8ffc',
   })
   @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' })
   @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
   async findOne(@Param() params: FindUserDto): Promise<UserResponseDto> {
      const doc = await this._UserService.findOne(params.id);

      return {
         username: doc.username,
         email: doc.email,
         activities: doc.activities,
      };
   }
}
