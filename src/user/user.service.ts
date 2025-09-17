import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserActivities } from './dto/Add_Activities';
import { UserAllResponseDTO } from './dto/Find_All_User';
import { UsersResponseDto } from './dto/Find_All_Users';
import { UserResponseDto } from './dto/Find_User_By_Id';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private readonly _userModel: Model<UserDocument>) {}

   // READ - find all (avec pagination simple)
   async findAll(skip = 0, limit = 20): Promise<UsersResponseDto[]> {
      return this._userModel.find().skip(skip).limit(limit).lean<UsersResponseDto[]>();
   }

   //Recherche d'un utilisateur par son ID
   async findOne(id: string): Promise<UserResponseDto> {
      //Requête faite ci-dessous
      const doc = await this._userModel.findById(id).lean<UserResponseDto>();

      if (!doc) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }
      return doc;
   }

   async findUser(id: string): Promise<UserAllResponseDTO> {
      const doc = await this._userModel.findById(id).lean<UserAllResponseDTO>();

      if (!doc) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      return doc;
   }

   async addActivities(id_user: string, id_activities: string): Promise<void> {
      const list = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!list) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      await this._userModel.findByIdAndUpdate(
         id_user,
         { $push: { activities: id_activities } },
         { new: true },
      );
   }

   async delActivities(id_user: string, id_activities: string): Promise<void> {
      const list = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!list) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      await this._userModel.findByIdAndUpdate(
         list._id,
         { $pull: { activities: id_activities } },
         { new: true },
      );
   }

   async banUser(id_user: string): Promise<void> {
      const user = await this._userModel.findById(id_user).lean<UserActivities>();
      if (!user) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }
      await this._userModel.findByIdAndUpdate(id_user, { $set: { isBlock: true } }, { new: true });
   }
}
