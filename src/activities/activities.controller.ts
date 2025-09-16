import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ActivitiesService } from './activities.service';
import { ActivityResponseDto, Enter_Activity } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
   constructor(private readonly _ActivitiesService: ActivitiesService) {}

   @Get('findAll')
   @ApiResponse({ status: 200, description: 'Activité trouvé.' })
   @ApiResponse({ status: 404, description: 'Aucune activités trouvé.' })
   async findAll(): Promise<FindAllActivities[]> {
      return await this._ActivitiesService.findAll();
   }

   @Get(':id')
   @ApiParam({
      name: 'id',
      description: "L'identifiant de l'activité",
      example: '68c4158f2862b6fbf1fb9000',
   })
   @ApiResponse({ status: 200, description: 'Activité trouvé.' })
   @ApiResponse({ status: 404, description: 'Activité non trouvé.' })
   async findOne(@Param() params: Enter_Activity): Promise<ActivityResponseDto> {
      return this._ActivitiesService.findOne(params.id);
   }
}
