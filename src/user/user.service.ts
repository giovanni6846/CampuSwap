import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { UserResponseDto } from './dto/Find_User_By_Id';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

   // CREATE
   async create(data: Pick<User, 'name' | 'age'>): Promise<User> {
      return this.userModel.create(data);
   }

   // READ - find all (avec pagination simple)
   async findAll(skip = 0, limit = 20): Promise<User[]> {
      return this.userModel.find().skip(skip).limit(limit).lean(); // lean() => objets JS simples
   }

   // READ - find by filter
   async findByFilter(filter: FilterQuery<UserDocument>): Promise<User[]> {
      return this.userModel.find(filter).lean();
   }


   //Recherche d'un utilisateur par son ID
   async findOne(id: string): Promise<UserResponseDto> {
      //Requête faite ci-dessous
      const doc = await this.userModel.findById(id).lean();

      //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
      if (!doc) {
         throw new NotFoundException(`User with id ${id} not found`);
      }

      //Jeu de test pour voir si l'utilisateur, si ce n'est pas la bonne, retourner le DTO avec si request succes, et un message
      if (doc.name !== 'Alice Dupont') {
         return { success: false, message: "L'utilisatrice rechercher n'est pas la bonne" };
      };
      
      //Si la condition est bonne, alors retourner le DTO avec suces true, message ok et la data récupérer
      return { success: true, message: "OK", user: doc };
   }

   // UPDATE
   async update(id: string, update: UpdateQuery<UserDocument>): Promise<User> {
      const doc = await this.userModel
         .findByIdAndUpdate(id, update, { new: true, runValidators: true })
         .lean();
      if (!doc) throw new NotFoundException('User not found');
      return doc;
   }

   // DELETE
   async remove(id: string): Promise<void> {
      const res = await this.userModel.findByIdAndDelete(id);
      if (!res) throw new NotFoundException('User not found');
   }
}
