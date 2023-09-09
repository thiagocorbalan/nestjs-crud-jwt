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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getUsers();
	}

	@Get(':id')
	getUser(@Param('id') id: number) {
		if (!id) throw new BadRequestException('id not found');
		return this.usersService.getUser(id);
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
		return this.usersService.create(name);
	}

	@Delete(':id')
	deleteUser(@Param('id') id: number) {
		return this.usersService.delete(id);
	}

	@Put(':id')
	updateUser(@Param('id') id: number, @Body('name') name: string) {
		return this.usersService.update(id, name);
	}
}
