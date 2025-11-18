import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { StatusService } from './status.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
   constructor(private readonly _StatusService: StatusService) {}
   @Get()
   @ApiResponse({ status: 200, description: 'Connexion établit' })
   status(): boolean {
      return this._StatusService.status();
   }
}
