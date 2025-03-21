import { MailService } from './../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../../database/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService, MailService],
  exports: [UserService],  
})
export class UserModule {}
