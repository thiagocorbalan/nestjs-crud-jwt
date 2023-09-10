import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const JWT_SECRET = process.env.SECRET;

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true,
			secret: JWT_SECRET,
			signOptions: { expiresIn: '60s' },
		}),
	],
})
export class AuthModule {}
