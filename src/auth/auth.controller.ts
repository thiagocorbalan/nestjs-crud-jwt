import { UsersDto } from 'src/users/users.dto';
import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInDto: UsersDto) {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}
}
