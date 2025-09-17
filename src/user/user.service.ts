import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectModel, IsObjectIdPipe} from '@nestjs/mongoose';
import {Model, Types} from 'mongoose';

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

       if (doc.isBlock){
           throw new UnauthorizedException({
               message: 'Utilisateur bloqué',
           })
       }

       if (doc.IsValidated == false){
           throw new UnauthorizedException({
               message: 'Inscription non finalisée'
           })
       }

      return doc;
   }

   async addActivities(id_user: string, id_activities: string): Promise<void> {
      const list = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!list) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

       if (list.isBlock){
           throw new UnauthorizedException({
               message: 'Utilisateur bloqué',
           })
       }

       if (list.IsValidated == false){
           throw new UnauthorizedException({
               message: 'Inscription non finalisée'
           })
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

       if (list.isBlock){
           throw new UnauthorizedException({
               message: 'Utilisateur bloqué',
           })
       }

       if (list.IsValidated == false){
           throw new UnauthorizedException({
               message: 'Inscription non finalisée'
           })
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

      console.log(user._id)

      await this._userModel.findByIdAndUpdate(new Types.ObjectId(user._id), { $set: { isBlock: true } }, { new: true });

   }
}
