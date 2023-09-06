import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserType } from './type';

@Injectable()
export class AppService {
	private users: Array<UserType>;

	constructor() {
		this.users = [];
	}

	getUser(id: string): UserType {
		return this.users.find((user) => user.id === id);
	}

	getUsers(): Array<UserType> {
		return this.users;
	}

	create(name: string) {
		if (!name) return;
		this.users.push({ id: randomUUID(), name });
	}

	update(id: string, body: UserType) {
		const idx = this.findIndex(id);

		if (this.users[idx]) {
			this.users[idx].name = body.name;
		}
	}

	delete(id: string) {
		this.users = this.users.filter((user) => user.id !== id);
	}

	private findIndex(id: string): number {
		return this.users.findIndex((user) => user.id === id);
	}
}
