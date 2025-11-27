import {
   ConflictException,
   Injectable,
   InternalServerErrorException,
   NotFoundException,
   UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UsersService } from '../user/user.service';
import { CreationResponseDto } from './dto/creation';
import { DesinscriptionResponseDto } from './dto/desinscription';
import { ActivityResponseDto } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';
import { InscriptionResponseDto } from './dto/inscription';
import { ModerationResponseDto } from './dto/moderation';
import { SearchActivitiesDto, SearchActivitiesResponseDto } from './dto/search';
import { SuppressionResponseDto } from './dto/suppression';
import { Activities, ActivitiesDocument } from './schemas/activities.schema';

@Injectable()
export class ActivitiesService {
   constructor(
      @InjectModel(Activities.name) private readonly _ActivitiesModel: Model<ActivitiesDocument>,
      private readonly UsersService: UsersService,
   ) {}

   //Recherche d'une activité par son ID
   async findOne(id: string): Promise<ActivityResponseDto> {
      //Requête faite ci-dessous
      const doc = await this._ActivitiesModel.findById(id).lean();

      //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
      if (!doc) {
         throw new NotFoundException(`Activities with id ${id} not found`);
      }

      return doc;
   }

    async findOneSync(id: string): Promise<SearchActivitiesResponseDto> {
        //Requête faite ci-dessous
        const doc = await this._ActivitiesModel.findById(id).lean();

        //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
        if (!doc) {
            return {
                _id: "",
                name:"",
                description: "",
                datdeb: new Date(),
                datfin: new Date(),
                user_created: "",
            };
        }

        return {
            _id: doc._id.toString(),
            name: doc.name,
            description: doc.description,
            datdeb: doc.datdeb,
            datfin: doc.datfin,
            user_created: doc.user_created?.toString(),
        };
    }

   async findAll(): Promise<FindAllActivities[]> {
      //Requête faite ci-dessous
      const activities = await this._ActivitiesModel.find().lean<FindAllActivities[]>();

      //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
      if (!activities) {
         throw new NotFoundException(`Activities not found`);
      }

      return activities;
   }

    async findAllAU(): Promise<SearchActivitiesResponseDto[]> {
        //Requête faite ci-dessous
        const activities = await this._ActivitiesModel.find().lean<SearchActivitiesResponseDto[]>();

        //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
        if (!activities) {
            throw new NotFoundException(`Activities not found`);
        }

        return activities;
    }

   async search(query: SearchActivitiesDto): Promise<SearchActivitiesResponseDto> {
      const filter: any = {};
      if (query.start && query.end) {
         filter.datdeb = { $gte: new Date(query.start) };
         filter.datfin = { $lte: new Date(query.end) };
      }
      if (query.name) {
         filter.name = { $regex: query.name, $options: 'i' };
      }
      return this._ActivitiesModel.find(filter).lean<SearchActivitiesResponseDto>();
   }

   async creation(
      name: string,
      datdeb: Date,
      datfin: Date,
      description: string,
      seat: string,
      user_created: string,
   ): Promise<CreationResponseDto> {

       console.log(name, datdeb, datfin, description, seat, user_created);

      const user = await this.UsersService.findUser(user_created);

      if (!user) {
         throw new NotFoundException('Utilisateur inexistant');
      }

      if (datdeb >= datfin) {
         throw new ConflictException('Date de début supérieur ou égal à la date de fin');
      }

      /*if (seat == "0"){
            throw new ConflictException("Impossible de créer une activité avec 0 place disponible")
        }*/
      for (const users_activities of user.activities) {
         const activities = await this._ActivitiesModel.findById(users_activities);
         if (!activities) {
             await this.UsersService.delActivities(user._id, users_activities);
         } else {
             if (datdeb < activities.datfin && datfin > activities.datfin) {
                 throw new ConflictException({
                     message:
                         'Vous avez déjà une activité de réserver sur ce crénaux, création impossible',
                 });
             }
         }
      }

      await this._ActivitiesModel.create({
         datdeb: new Date(datdeb),
         datfin: new Date(datfin),
         description: description,
         name: name,
         seat: seat,
         user_created: user_created.toString(),
      });

      const filter: any = {};
       const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      if (name) {
         filter.name = { $regex: escapeRegex(name), $options: 'i' };
      }
      const activities_created = await this._ActivitiesModel
         .find(filter)
         .lean<SearchActivitiesResponseDto>();

      if (!activities_created[0]._id) {
         throw new InternalServerErrorException('Erreur lors de la création');
      }


      await this.UsersService.addActivities(user_created, activities_created[0]._id);

      return {
         message: "Création de l'activité réussite",
      };
   }

   async suppression(id_user: string, id_activities: string): Promise<SuppressionResponseDto> {
      const user = await this.UsersService.findUser(id_user);

      if (!user) {
         throw new NotFoundException('Utilisateur inexistant');
      }

      const activities = await this._ActivitiesModel.findById(id_activities);

      if (!activities) {
         throw new NotFoundException('Activité inexistante');
      }

      if (user._id != activities.user_created.toString()) {
         throw new UnauthorizedException({
            message: 'Vous ne pouvez-pas supprimer cette activité',
         });
      }

      const users = await this.UsersService.findAll();

      for (const user of users) {
         for (const users_activities of user.activities) {
            if (users_activities == id_activities) {
               await this.UsersService.delActivities(user._id, id_activities);
               break;
            }
         }
      }


      await activities.deleteOne();

      const activitiesCtrl = await this._ActivitiesModel.findById(id_activities);

      if (activitiesCtrl) {
         throw new InternalServerErrorException("SUppression de l'activité impossible");
      }

      return {
         message: 'Suppression réussite',
      };
   }

   async inscription(id_user: string, id_activities: string): Promise<InscriptionResponseDto> {
      const user = await this.UsersService.findUser(id_user);

      const activity = await this._ActivitiesModel.findById(id_activities);

      if (!activity) {
         throw new NotFoundException({
            message: 'Activité inexistante',
         });
      }

      if (activity.user_created.toString() == id_user) {
         throw new ConflictException({
            message: "Vous avez créer l'activité, inscription impossible",
         });
      }

      if (activity.seat <= 0) {
         throw new ConflictException({
            message: 'Plus de place disponible',
         });
      }

      if (user.activities.length == 0) {
         await this.UsersService.addActivities(id_user, id_activities);
         activity.seat -= 1;
         await activity.save();
         return {
            activity: id_activities,
            message: 'Inscription réussite',
         };
      }

      for (const users_activities of user.activities) {
         const activities = await this._ActivitiesModel.findById(users_activities);

         if (!activities) {
            throw new NotFoundException({
               message: "L'activité utilisateur est indisponible",
            });
         }

         if (users_activities == id_activities) {
            throw new ConflictException({
               message: "Vous êtes déjà inscrit à l'activité",
            });
         }

         if (activity.datdeb < activities.datfin && activity.datfin > activities.datfin) {
            throw new ConflictException({
               message: 'Vous avez déjà une activité de réserver sur ce crénaux',
            });
         }
      }

      await this.UsersService.addActivities(id_user, id_activities);
      activity.seat -= 1;
      await activity.save();
      return {
         activity: id_activities,
         message: 'Inscription réussite',
      };
   }

   async desinscription(
      id_user: string,
      id_activities: string,
   ): Promise<DesinscriptionResponseDto> {
      const user = await this.UsersService.findUser(id_user);

      const activity = await this._ActivitiesModel.findById(id_activities);

      if (!activity) {
         throw new NotFoundException({
            message: 'Activité inexistante',
         });
      }

      for (const users_activities of user.activities) {
         if (users_activities == id_activities) {
            await this.UsersService.delActivities(id_user, id_activities);
            activity.seat += 1;
            await activity.save();
            return {
               message: 'Désinscription réussite',
            };
         }
      }

      throw new NotFoundException({
         message: "Vous n'êtes pas inscrit à cette activité",
      });
   }

   async moderation(
      id_user: string,
      id_activities: string,
      motif: string,
      moderation: boolean,
   ): Promise<ModerationResponseDto> {
      const user = await this.UsersService.findUser(id_user);

      if (!user.isAdmin) {
         throw new UnauthorizedException({
            message: "Vous n'avez pas les droits",
         });
      }

      const activity = await this._ActivitiesModel.findById(id_activities);

      if (!activity) {
         throw new NotFoundException({
            message: 'Activité inexistante',
         });
      }

      const users = await this.UsersService.findAll();
      const user_moderation = await this.UsersService.findUser(activity.user_created.toString());

      for (const user of users) {
         for (const users_activities of user.activities) {
            if (users_activities == id_activities) {
               await this.UsersService.delActivities(user._id, id_activities);
               break;
            }
         }
      }

      if (moderation) {
         await this.UsersService.banUser(user_moderation._id.toString());
         await activity.deleteOne();
      } else {
         await activity.deleteOne();
      }

      return {
         message: "Modération de l'activité réussite",
         motif: motif,
      };
   }
}
