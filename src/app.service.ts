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

  getUser(): string {
    return 'Hello World!';
  }

  getUsers(): Array<UserType> {
    return this.users;
  }

  create(name: string) {
    if (!name) return;
    this.users.push({ id: randomUUID(), name });
  }

  update(): string {
    return 'Hello World!';
  }

  delete(): string {
    return 'Hello World!';
  }
}
