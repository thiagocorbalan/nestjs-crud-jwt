import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async getUser(id: number) {
		return await this.prisma.users.findUnique({
			where: {
				id: +id,
			},
		});
	}

	async getUsers(): Promise<Users[]> {
		return this.prisma.users.findMany();
	}

	async create(name: string) {
		if (!name) return;

		await this.prisma.users.create({
			data: {
				name,
			},
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
