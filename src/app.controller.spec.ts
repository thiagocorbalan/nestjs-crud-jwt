import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
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

      expect(appController.getUsers()).toEqual(['Thiago']);
    });
  });
});
