import {ConflictException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { UsersService } from '../user/user.service';
import { ActivityResponseDto } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';
import { SearchActivitiesDto } from './dto/search';
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

   async findAll(): Promise<FindAllActivities[]> {
      //Requête faite ci-dessous
      const activities = await this._ActivitiesModel.find().lean<FindAllActivities[]>();

      //Doc porte la date si la requête à trouver une donnée sinon, retourne une erreur
      if (!activities) {
         throw new NotFoundException(`Activities not found`);
      }

      return activities;
   }

   async search(query: SearchActivitiesDto) {
      const filter: any = {};
      if (query.start && query.end) {
         filter.datdeb = { $gte: new Date(query.start) };
         filter.datfin = { $lte: new Date(query.end) };
      }
      if (query.name) {
         filter.name = { $regex: query.name, $options: 'i' };
      }
      return this._ActivitiesModel.find(filter).lean();
   }

   async inscription(id_user: string, id_activities: string) {

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

      if (user.isBlock) {
         throw new ConflictException({
            message: 'Le compte utilisateur est indisponible',
         });
      }

      if (user.activities.length == 0) {
         await this.UsersService.addActivities(id_user, id_activities);
         activity.seat -= 1;
         await activity.save();
         return {
            activity: activity,
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
         await this.UsersService.addActivities(id_user, id_activities);
         activity.seat -= 1;
         await activity.save();
         return {
            activity: id_activities,
            message: 'Inscription réussite',
         };
      }
   }

    async desinscription(id_user: string, id_activities: string) {

        const user = await this.UsersService.findUser(id_user);

        if (!user) {
            throw new NotFoundException({
                message: 'Utilisateur inéxistant',
            })
        }

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
                    message: "Désinscription réussite"
                }
            }
        }

        throw new NotFoundException({
            message: "Vous n'êtes pas inscrit à cette activité"
        })
    }

    async moderation(id_user: string, id_activities: string, motif: string, moderation: boolean) {

        const user = await this.UsersService.findUser(id_user);

        if (!user) {
            throw new NotFoundException({
                message: 'Utilisateur inéxistant',
            })
        }

        if (!user.isAdmin){
            throw new UnauthorizedException({
                message: "Vous n'avez pas les droits",
            })
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

        if (moderation){
            await this.UsersService.banUser(user_moderation._id.toString());
            await activity.deleteOne();
            return {
                message: "Modération de l'activité réussite",
                motif: motif,
            }
        }else{
                await activity.deleteOne();
                return {
                    message: "Modération de l'activité réussite",
                    motif: motif,
                }
        }
    }
}