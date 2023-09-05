import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return empty users when call getUsers', () => {
      expect(appController.getUsers()).toEqual([]);
    });

    it('should return one user when call createUser', () => {
      appController.createUser('Thiago');

      const user = appController
        .getUsers()
        .find((user) => user.name === 'Thiago');

      expect(user).not.toBeUndefined();
    });

    it('should return user when call getUser by id', () => {
      const user = appController
        .getUsers()
        .find((user) => user.name === 'Thiago');

      expect(appController.getUser(user.id)).toEqual({
        id: user.id,
        name: 'Thiago',
      });
    });

    it('should return user updated when call updateUser', () => {
      const user = appController
        .getUsers()
        .find((user) => user.name === 'Thiago');

      appController.updateUser(user.id, 'Corbalan');

      const userUpdated = appController
        .getUsers()
        .find((user) => user.name === 'Corbalan');

      expect(userUpdated).toEqual({
        id: user.id,
        name: 'Corbalan',
      });
    });

    it('should return user list whitout Corbalan user when call deleteUser', () => {
      const user = appController
        .getUsers()
        .find((user) => user.name === 'Corbalan');

      if (user) {
        appController.deleteUser(user.id);
        expect(appController.getUsers()).toEqual([]);
      }
    });
  });
});
