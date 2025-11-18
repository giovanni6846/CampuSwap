import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusService {
   status(): boolean {
      return true;
   }
}
