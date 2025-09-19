import {
   ConflictException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model, Types } from 'mongoose';

import { InscriptionResponseDto } from '../auth/dto/inscription';
import { ValidationResponseDto } from '../auth/dto/validation_login';
import { UserActivities } from './dto/Add_Activities';
import { UserAllResponseDTO } from './dto/Find_All_User';
import { UsersResponseDto } from './dto/Find_All_Users';
import { UserResponseDto } from './dto/Find_User_By_Id';
import { UserValidatedResponseDto } from './dto/Find_User_Validated';
import { UserLogin, UserLoginResponse } from './dto/User_Login';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private readonly _userModel: Model<UserDocument>) {}

   // READ - find all (avec pagination simple)
   async findAll(skip = 0, limit = 20): Promise<UsersResponseDto[]> {
      return this._userModel.find().skip(skip).limit(limit).lean<UsersResponseDto[]>();
   }

   //Recherche d'un utilisateur par son ID
   async findOne(id: string, jwt: string): Promise<UserResponseDto> {
      verifyToken(jwt)
      const doc = await this._userModel.findById(id).lean<UserResponseDto>();

      if (!doc) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }
      return doc;
   }

   async findUserValidated(id: string): Promise<ValidationResponseDto> {
      const user = await this._userModel.findById(id).lean<UserValidatedResponseDto>();

      if (!user) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      if (user.IsValidate) {
         throw new ConflictException('Le compte est déjà validé');
      }

      await this._userModel.findByIdAndUpdate(
         new Types.ObjectId(id),
         { $set: { IsValidate: true } },
         { new: true },
      );

      const userValidation = await this._userModel.findById(id).lean<UserValidatedResponseDto>();

      if (!userValidation) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      if (userValidation.IsValidate) {
         return {
            message: 'Validation réussite, vous pouvez vous connecter',
         };
      }

      throw new InternalServerErrorException({
         message: 'Erreur lors de la mise à jour',
      });
   }
   async findUser(id: string): Promise<UserAllResponseDTO> {
      const user = await this._userModel.findById(id).lean<UserAllResponseDTO>();

      if (!user) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      if (user.isBlock) {
         throw new UnauthorizedException({
            message: 'Utilisateur bloqué',
         });
      }

      if (user.IsValidate == false) {
         throw new UnauthorizedException({
            message: 'Inscription non finalisée',
         });
      }

      return user;
   }

   async addActivities(id_user: string, id_activities: string): Promise<void> {
      const list = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!list) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      if (list.isBlock) {
         throw new UnauthorizedException({
            message: 'Utilisateur bloqué',
         });
      }

      if (list.IsValidated == false) {
         throw new UnauthorizedException({
            message: 'Inscription non finalisée',
         });
      }

      await this._userModel.findByIdAndUpdate(
         id_user,
         { $push: { activities: id_activities } },
         { new: true },
      );

      const user = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!user) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      for (const activity of user.activities) {
         if (activity == id_activities) {
            return;
         }
      }

      throw new InternalServerErrorException({
         message: 'Erreur lors de la mise à jour',
      });
   }

   async delActivities(id_user: string, id_activities: string): Promise<void> {
      const list = await this._userModel.findById(id_user).lean<UserActivities>();

      if (!list) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      if (list.isBlock) {
         throw new UnauthorizedException({
            message: 'Utilisateur bloqué',
         });
      }

      if (list.IsValidated == false) {
         throw new UnauthorizedException({
            message: 'Inscription non finalisée',
         });
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

      console.log(user._id);

      await this._userModel.findByIdAndUpdate(
         new Types.ObjectId(user._id),
         { $set: { isBlock: true } },
         { new: true },
      );
   }

   async login(email: string, password: string): Promise<UserLoginResponse> {
      const user = await this._userModel.findOne({ email }).lean<UserLogin>();

      if (!user) {
         throw new NotFoundException(`Utilisateur inexistant`);
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
         throw new ConflictException('Mot de passe incorrecte');
      }

      const token = jwt.sign({ email: email }, 's0vyuKByX43XgiINVr7RjScAHYu6g4', {
         expiresIn: '1h',
      });

      return {
         jwt: token,
         message: 'Connexion réussite',
      };
   }

   async inscription(
      email: string,
      password: string,
      username: string,
   ): Promise<InscriptionResponseDto> {
      const user = await this._userModel.findOne({ email }).lean<UserLogin>();

      if (user) {
         throw new ConflictException(`Email indisponible`);
      }

      const HashPassword = await this.hashPassword(password);

      if (email.substring(0, 15) == 'admin.campuswap') {
         await this._userModel.create({
            username: username,
            password: HashPassword,
            email: email,
            isAdmin: true,
            isBlock: false,
            activities: [],
            IsValidate: false,
         });
      } else {
         await this._userModel.create({
            username: username,
            password: HashPassword,
            email: email,
            isAdmin: false,
            isBlock: false,
            activities: [],
            IsValidate: false,
         });
      }

      const userCreated = await this._userModel.findOne({ email }).lean<UserLogin>();

      if (!userCreated) {
         throw new InternalServerErrorException("Problème lors de la cration de l'utilisateur");
      }

      return {
         message:
            'Utilisateur créer avec succès, vous allez recevoir un email de confirmation pour valider votre inscription',
      };
   }

   async hashPassword(password: string): Promise<string> {
      const saltRounds = 10;
      return await bcrypt.hash(password, saltRounds);
   }
}

function verifyToken(token: string){

     const decoded = jwt.verify(token, 's0vyuKByX43XgiINVr7RjScAHYu6g4');

     if(decoded == false){
         throw new UnauthorizedException("Votre session à expiré, veuillez-vous reconnecter")
     }
}
