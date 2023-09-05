import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser(id: string) {
    return this.appService.getUser(id);
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post()
  createUser(name: string) {
    return this.appService.create(name);
  }

  @Delete()
  deleteUser(id: string) {
    return this.appService.delete(id);
  }

  @Put()
  updateUser(id: string, name: string) {
    return this.appService.update(id, name);
  }
}
