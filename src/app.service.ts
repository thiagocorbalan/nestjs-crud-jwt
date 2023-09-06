import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from './prisma.service';
import type { UserType } from './types';

@Injectable()
export class AppService {
	private users: Array<UserType>;

	constructor(private prisma: PrismaService) {
		this.users = [];
	}

	getUser(id: number) {
		return this.users.find((user) => user.id === id);
	}

	async getUsers(): Promise<Users[]> {
		return this.prisma.users.findMany();
	}

	create(name: string) {
		if (!name) return;
		//this.users.push({ id: randomUUID(), name });
	}

	update(id: number, name: string) {
		const idx = this.findIndex(id);

		if (this.users[idx]) {
			this.users[idx].name = name;
		}
	}

	delete(id: number) {
		this.users = this.users.filter((user) => user.id !== id);
	}

	private findIndex(id: number): number {
		return this.users.findIndex((user) => user.id === id);
	}
}
