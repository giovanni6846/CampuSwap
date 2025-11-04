import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ActivitiesService } from './activities.service';
import { CreationDto, CreationResponseDto } from './dto/creation';
import { DesinscriptionDto, DesinscriptionResponseDto } from './dto/desinscription';
import { ActivityResponseDto, Enter_Activity } from './dto/Find_Activities_By_Id';
import { FindAllActivities } from './dto/find_all_activities';
import { InscriptionDto, InscriptionResponseDto } from './dto/inscription';
import { ModerationDto, ModerationResponseDto } from './dto/moderation';
import { SearchActivitiesDto, SearchActivitiesResponseDto } from './dto/search';
import { SuppressionDto, SuppressionResponseDto } from './dto/suppression';

@ApiTags('activities')
@UseGuards(AuthGuard)
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
   async search(@Query() query: SearchActivitiesDto): Promise<SearchActivitiesResponseDto> {
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
   @ApiResponse({ status: 201, description: 'Inscription réussite' })
   @ApiResponse({
      status: 409,
      description: 'Problèmes de paramètres entrée / inscription impossible',
   })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   async inscription(@Body() body: InscriptionDto): Promise<InscriptionResponseDto> {
      return this._ActivitiesService.inscription(body.id_user, body.id_activities);
   }

   @Post('creation')
   @ApiBody({ type: CreationDto })
   @ApiResponse({ status: 201, description: 'Activité créer' })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   @ApiResponse({ status: 400, description: 'Paramètres manquant ou incorrect' })
   async creation(@Body() body: CreationDto): Promise<CreationResponseDto> {
      return this._ActivitiesService.creation(
         body.name,
         body.datdeb,
         body.datfin,
         body.description,
         body.seats,
         body.user_created,
      );
   }

   @Post('suppression')
   @ApiBody({ type: SuppressionDto })
   @ApiResponse({ status: 201, description: 'Activité supprimer' })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   @ApiResponse({ status: 400, description: 'Paramètres manquant ou incorrect' })
   async suppression(@Body() body: SuppressionDto): Promise<SuppressionResponseDto> {
      return this._ActivitiesService.suppression(body.id_user, body.id_activities);
   }

   @Post('desinscription')
   @ApiBody({ type: DesinscriptionDto })
   @ApiResponse({ status: 201, description: 'Désinscription réussite' })
   @ApiResponse({
      status: 409,
      description: 'Problèmes de paramètres entrée / inscription impossible',
   })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   async desinscription(@Body() body: DesinscriptionDto): Promise<DesinscriptionResponseDto> {
      return this._ActivitiesService.desinscription(body.id_user, body.id_activities);
   }

   @Post('moderation')
   @ApiBody({ type: ModerationDto })
   @ApiResponse({ status: 201, description: "Modération de l'activité réussite" })
   @ApiResponse({
      status: 409,
      description: 'Problèmes de paramètres entrée / inscription impossible',
   })
   @ApiResponse({ status: 401, description: 'Erreur JWT' })
   async moderation(@Body() body: ModerationDto): Promise<ModerationResponseDto> {
      return this._ActivitiesService.moderation(
         body.id_user,
         body.id_activities,
         body.motif,
         body.moderation,
      );
   }
}
