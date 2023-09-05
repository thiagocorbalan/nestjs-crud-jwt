import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser() {}

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post()
  createUser(name: string) {
    return this.appService.create(name);
  }

  @Delete()
  deleteUser() {}

  @Put()
  updateUser() {}
}
