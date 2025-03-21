import { MailService } from './../mail/mail.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RequestResetDto } from './dto/request.reset.dto';
import { PrismaService } from './../../database/prisma.service';
// src/modules/auth/auth.service.ts

import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async login(user: any) {
    const payload = { userId: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = crypto.randomBytes(64).toString('hex');
    await this.userService.createRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async refresh(refreshToken: string) {
    const token = await this.userService.findRefreshToken(refreshToken);
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userService.findById(token.userId);
    const payload = { userId: user.id, roles: user.roles };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout(refreshToken: string) {
    const token = await this.userService.findRefreshToken(refreshToken);
    if (!token) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    await this.userService.deleteRefreshToken(refreshToken);
    return { message: 'Logged out successfully' };
  }

async requestPasswordReset(dto: RequestResetDto) {
  const user = await this.prisma.user.findUnique({ where: { email: dto.email } });

  if (!user) {
    throw new NotFoundException('User not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const resetExpires = new Date();
  resetExpires.setHours(resetExpires.getHours() + 1); 

  await this.prisma.user.update({
    where: { email: dto.email },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    },
  });

  await this.mailService.sendPasswordResetEmail(dto.email, resetToken);

  return { message: 'Password reset email sent' };
}

async resetPassword(dto: ResetPasswordDto) {
  const { resetToken, newPassword } = dto;

  const user = await this.prisma.user.findFirst({
    where: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: { gt: new Date() },
    },
  });

  if (!user) {
    throw new NotFoundException('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await this.prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    },
  });

  return { message: 'Password successfully reset' };
}

async validateGoogleUser(profile: any) {
  const { emails, displayName, id } = profile;
  const email = emails[0]?.value;
  const verificationToken = crypto.randomBytes(32).toString('hex');
  const verificationExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24);


  let user = await this.prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await this.prisma.user.create({
      data: {
        email,
        name: displayName,
        isVerified: false,
        verificationToken,
        verificationExpiresAt,
      },
    });
    await this.mailService.sendVerificationEmail(user.email,verificationToken);
    return {
      message: 'Account created successfully. Please check your email to verify your account.',
    };
  }

  if (!user.isVerified) {
    return {
      message: 'Account not activated. Please check your email to verify your account.',
    };
  }
 
  const token = this.jwtService.sign({ userId: user.id });

  return { user, token };
}
}
