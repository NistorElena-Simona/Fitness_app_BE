import { MailService } from './../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '../../database/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService, PrismaService, UserService, JwtService, MailService],
})
export class AdminModule {}
