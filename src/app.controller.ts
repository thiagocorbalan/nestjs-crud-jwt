import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserType } from './type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  getUser(@Param('id') id: string) {
    if (!id) throw new BadRequestException('id not found');
    return this.appService.getUser(id);
  }

  @Get('users')
  getUsers() {
    return this.appService.getUsers();
  }

  @Post()
  createUser(@Body('name') name: string) {
    if (!name) {
      throw new HttpException(
        {
          message: 'body is required',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.appService.create(name);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.appService.delete(id);
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: UserType) {
    return this.appService.update(id, body);
  }
}
