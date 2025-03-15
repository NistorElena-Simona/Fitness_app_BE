import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly baseUrl = process.env.BASE_URL;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html?: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      text,
      html,
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${this.baseUrl}/user/verify-email?token=${token}`;

    await this.sendMail(
      email,
      'Verify Your Email',
      `Click the link to verify your email: ${verificationUrl}`,
      `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
    );
  }

  async sendPasswordResetEmail(email: string, resetToken: string) {
    const resetPasswordUrl = `${this.baseUrl}/auth/reset-password?token=${resetToken}`;

    await this.sendMail(
      email,
      'Password Reset Request',
      `Click the link to reset your password: ${resetPasswordUrl}`,
      `<p>Click <a href="${resetPasswordUrl}">here</a> to reset your password.</p>`
    );
  }
}
