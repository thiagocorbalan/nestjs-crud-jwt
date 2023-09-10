import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(username: string, password: string): Promise<any> {
		const user = await this.usersService.getUser(username, password);

		if (user?.password !== password) {
			throw new UnauthorizedException();
		}

		const payload = {
			id: user.id,
			name: user.name,
			email: user.email,
		};

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
