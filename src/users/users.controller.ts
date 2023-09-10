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
import { UsersDto } from './users.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	getUsers() {
		return this.usersService.getUsers();
	}

	@Get(':id')
	getUser(@Param('id') id: string) {
		if (!id) throw new BadRequestException('id not found');

		return this.usersService.getUserById(parseInt(id));
	}

	@Post()
	createUser(@Body() data: UsersDto) {
		if (!data) {
			throw new HttpException(
				{
					message: 'body is required',
					status: HttpStatus.BAD_REQUEST,
				},
				HttpStatus.BAD_REQUEST,
			);
		}
		return this.usersService.create(data);
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
