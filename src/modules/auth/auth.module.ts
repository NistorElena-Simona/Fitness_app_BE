import { ConfigService } from '@nestjs/config';
import { MailService } from './../mail/mail.service';
import { PrismaService } from './../../database/prisma.service';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module'; 
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from '../auth/providers/google/google.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'google' }),  
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mysecret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, PrismaService, MailService, GoogleStrategy, ConfigService ],
})
export class AuthModule {}
