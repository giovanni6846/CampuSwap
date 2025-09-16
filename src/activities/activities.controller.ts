import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ActivitiesService } from './activities.service';
import { ActivityResponseDto, Enter_Activity } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';
import { InscriptionDto } from './dto/inscription';
import { SearchActivitiesDto } from './dto/search';

@ApiTags('activities')
@Controller('activities')
export class ActivitiesController {
   constructor(private readonly _ActivitiesService: ActivitiesService) {}

   @Get('findAll')
   @ApiResponse({ status: 200, description: 'Activité trouvé.' })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   async findAll(): Promise<FindAllActivities[]> {
      return await this._ActivitiesService.findAll();
   }

   @Get('search')
   @ApiResponse({ status: 200, description: 'Activité trouvé.' })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   async search(@Query() query: SearchActivitiesDto) {
      return this._ActivitiesService.search(query);
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

   @Post('inscription')
   @ApiBody({ type: InscriptionDto })
   async inscription(@Body() body: InscriptionDto) {
      return this._ActivitiesService.inscription(
         body.id_user,
         body.id_activities,
         /*body.jwt*/
      );
   }
}
