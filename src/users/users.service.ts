import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { UsersDto } from './users.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUser(email: string, password: string) {
		return await this.prisma.users.findUnique({
			where: {
				email,
				password,
			},
		});
	}

	async getUsers(): Promise<UsersDto[]> {
		return this.prisma.users.findMany();
	}

	async getUserById(id: number): Promise<UsersDto> {
		return await this.prisma.users.findUnique({
			where: {
				id,
			},
		});
	}

	async create(data: UsersDto) {
		if (!data) return;

		await this.prisma.users.create({
			data,
		});
	}

	update(id: number, name: string) {
		return this.prisma.users.update({
			where: {
				id: +id,
			},
			data: {
				name,
			},
		});
	}

	delete(id: number) {
		return this.prisma.users.delete({
			where: {
				id: +id,
			},
		});
	}
}
