import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ActivityResponseDto } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';
import { Activities, ActivitiesDocument } from './schemas/activities.schema';

@Injectable()
export class ActivitiesService {
   constructor(
      @InjectModel(Activities.name) private readonly _ActivitiesModel: Model<ActivitiesDocument>,
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
}
