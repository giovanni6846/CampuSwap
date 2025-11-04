import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { Enter_SyncDto } from './dto/sync_pull';
import { SyncService } from './sync.service';
import {SearchActivitiesResponseDto} from "../activities/dto/search";

@ApiTags('sync')
@UseGuards(AuthGuard)
@Controller('sync')
export class SyncController {
   constructor(private readonly _SyncService: SyncService) {}

   @Get('pull')
   @ApiParam({
      name: 'id_user',
      description: "L'identifiant de l'activité",
      example: '68c4158f2862b6fbf1fb9000',
   })
   @ApiParam({
      name: 'jwt',
      description: "Jeton d'authentification",
      example: '68c4158f2862b6fbf1fb9000',
   })
   @ApiResponse({ status: 200, description: 'Synchronisation réussite.' })
   @ApiResponse({ status: 404, description: 'Echec de la synchronisation.' })
   async sync(@Query() query: Enter_SyncDto): Promise<SearchActivitiesResponseDto[]> {
      return this._SyncService.sync_pull(query.id_user);
   }
}
