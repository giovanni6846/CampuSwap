import { Injectable } from '@nestjs/common';

import { ActivitiesService } from '../activities/activities.service';
import { SearchActivitiesResponseDto } from '../activities/dto/search';
import { UsersService } from '../user/user.service';

@Injectable()
export class SyncService {
   constructor(
      private readonly UsersService: UsersService,
      private readonly ActivitiesService: ActivitiesService,
   ) {}

   async sync_pull(id: string): Promise<SearchActivitiesResponseDto[]> {
      let liste_activities: SearchActivitiesResponseDto[] = [];

      const user = await this.UsersService.findOne(id);

      for (const activities of user.activities) {
         const activity: SearchActivitiesResponseDto = await this.ActivitiesService.findOneSync(activities);
         if (activity._id != "") {
             liste_activities.push({
                 _id: activity._id.toString(),
                 name: activity.name,
                 description: activity.description,
                 datdeb: new Date(activity.datdeb),
                 datfin: new Date(activity.datfin),
                 user_created: activity.user_created,
             });
         }
      }

       const activities: SearchActivitiesResponseDto[] = await this.ActivitiesService.findAllAU();

       for (const act of activities) {
           console.log(act);
           console.log(act.user_created);
           console.log(id);
           if ((act.user_created) == id) {
               liste_activities.push({
                   _id: act._id.toString(),
                   name: act.name,
                   description: act.description,
                   datdeb: new Date(act.datdeb),
                   datfin: new Date(act.datfin),
                   user_created: act.user_created,
               });
           }
       }
       console.log(liste_activities);
      return liste_activities;
   }
}
