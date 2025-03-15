// src/modules/user/user.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existingUser) throw new BadRequestException('Email already in use');
  
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);

    const userCount = await this.prisma.user.count();
  
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
        roles: userCount === 0 ? ['ADMIN'] : ['EMPLOYEE'],
        verificationToken,
        verificationExpiresAt,
      },
    });
  
    await this.mailService.sendVerificationEmail(user.email, verificationToken);
  
    return { message: 'User registered. Check your email for verification link.' };
  }
  

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: { verificationToken: token, verificationExpiresAt: { gte: new Date() } },
    });

    if (!user) throw new BadRequestException('Invalid or expired token');

    await this.prisma.user.update({
      where: { id: user.id },
      data: { isVerified: true, verificationToken: null, verificationExpiresAt: null },
    });

    return { message: 'Email verified successfully' };
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async checkPassword(user: any, password: string) {
    return bcrypt.compare(password, user.password);
  }

  async createRefreshToken(userId: string, token: string) {
    await this.prisma.refreshToken.create({
      data: { userId, token, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) },
    });
  }

  async findRefreshToken(token: string) {
    return this.prisma.refreshToken.findUnique({ where: { token } });
  }

  async deleteRefreshToken(token: string) {
    await this.prisma.refreshToken.delete({ where: { token } });
  }
}
