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

@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get(':id')
	getUser(@Param('id') id: number) {
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
	deleteUser(@Param('id') id: number) {
		return this.appService.delete(id);
	}

	@Put(':id')
	updateUser(@Param('id') id: number, @Body('name') name: string) {
		return this.appService.update(id, name);
	}
}
