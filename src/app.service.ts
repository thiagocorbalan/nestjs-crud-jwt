import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private users: Array<string>;

  constructor() {
    this.users = [];
  }

  getUser(): string {
    return 'Hello World!';
  }

  getUsers(): Array<string> {
    return this.users;
  }

  create(): string {
    return 'Hello World!';
  }

  update(): string {
    return 'Hello World!';
  }

  delete(): string {
    return 'Hello World!';
  }
}
