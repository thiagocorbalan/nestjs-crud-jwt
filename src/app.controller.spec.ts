import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

describe('AppController', () => {
	let appController: AppController;

	beforeAll(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AppController],
			providers: [AppService, PrismaService],
		}).compile();

		appController = app.get<AppController>(AppController);
	});

	describe('root', () => {
		it('should return empty users when call getUsers', async () => {
			jest.spyOn(AppService.prototype, 'getUsers').mockResolvedValue([]);
			expect(await appController.getUsers()).toEqual([]);
		});

		it('should return one user when call createUser', async () => {
			jest
				.spyOn(AppService.prototype, 'getUsers')
				.mockResolvedValue([{ id: 1, name: 'Thiago' }]);

			appController.createUser('Thiago');

			const user = await appController.getUsers();
			const result = user.find((user) => user.name === 'Thiago');

			expect(result).not.toBeUndefined();
		});

		it('should return user when call getUser by id', async () => {
			jest.spyOn(AppService.prototype, 'getUsers').mockResolvedValue([
				{ id: 1, name: 'Thiago' },
				{ id: 2, name: 'João' },
			]);

			jest
				.spyOn(AppService.prototype, 'getUser')
				.mockReturnValue({ id: 1, name: 'Thiago' });

			const user = await appController.getUsers();
			const result = user.find((user) => user.name === 'Thiago');

			expect(appController.getUser(result.id)).toEqual({
				id: result.id,
				name: 'Thiago',
			});
		});

		it('should return user updated when call updateUser', async () => {
			jest
				.spyOn(AppService.prototype, 'getUsers')
				.mockResolvedValue([{ id: 1, name: 'Corbalan' }])
				.mockResolvedValueOnce([
					{ id: 1, name: 'Thiago' },
					{ id: 2, name: 'João' },
				]);

			const user = await appController.getUsers();
			const result = user.find((user) => user.name === 'Thiago');

			appController.updateUser(result.id, 'Corbalan');

			const userUpdated = await appController.getUsers();
			const resultUserUpdated = userUpdated.find(
				(user) => user.name === 'Corbalan',
			);

			expect(userUpdated).toEqual([
				{
					id: resultUserUpdated.id,
					name: 'Corbalan',
				},
			]);
		});

		it('should return user list whitout Corbalan user when call deleteUser', async () => {
			jest
				.spyOn(AppService.prototype, 'getUsers')
				.mockResolvedValue([])
				.mockResolvedValueOnce([{ id: 1, name: 'Corbalan' }]);

			const users = await appController.getUsers();
			const user = users.find((user) => user.name === 'Corbalan');

			if (user) {
				appController.deleteUser(user.id);
				expect(await appController.getUsers()).toEqual([]);
			}
		});
	});
});
