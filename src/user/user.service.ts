import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersResponseDto } from './dto/Find_All_Users';
import { UserResponseDto } from './dto/Find_User_By_Id';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private readonly _userModel: Model<UserDocument>) {}

   // READ - find all (avec pagination simple)
   async findAll(skip = 0, limit = 20): Promise<UsersResponseDto[]> {
      return this._userModel.find().skip(skip).limit(limit).lean<UserResponseDto[]>();
   }

   //Recherche d'un utilisateur par son ID
   async findOne(id: string): Promise<UsersResponseDto> {
      //Requête faite ci-dessous
      const doc = await this._userModel.findById(id).lean();

      //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
      if (!doc) {
         throw new NotFoundException(`User with id ${id} not found`);
      }
      return doc;
   }
}
