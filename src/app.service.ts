import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

type UserType = {
  id: string;
  name: string;
};

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

  update(id: string, name: string) {
    const idx = this.findIndex(id);

    this.users[idx].name = name;
  }

  delete(id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }

  private findIndex(id: string): number {
    return this.users.findIndex((user) => user.id === id);
  }
}
