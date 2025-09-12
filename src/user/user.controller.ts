import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { FindUserDto } from './dto/Find_User_By_Id';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
   constructor(private readonly UserService: UsersService) {}

   @Post()
   create(@Body() body: { name: string; age: number }) {
      return this.UserService.create(body);
   }

   @Get()
   findAll(@Query('skip') skip = '0', @Query('limit') limit = '20') {
      return this.UserService.findAll(Number(skip), Number(limit));
   }

   @Get('search')
   search(@Query('name') name?: string, @Query('minAge') minAge?: string) {
      const filter: any = {};
      if (name) filter.name = new RegExp(name, 'i'); // recherche partielle
      if (minAge) filter.age = { $gte: Number(minAge) };
      return this.UserService.findByFilter(filter);
   }

   @Get(':id')
   findOne(@Param() params: FindUserDto) {
      return this.UserService.findOne(params.id);
   }

   @Patch(':id')
   update(@Param('id') id: string, @Body() body: Partial<{ name: string; age: number }>) {
      return this.UserService.update(id, body);
   }

   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.UserService.remove(id);
   }
}
