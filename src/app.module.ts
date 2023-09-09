import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [AppController],
	providers: [PrismaService],
})
export class AppModule {}
