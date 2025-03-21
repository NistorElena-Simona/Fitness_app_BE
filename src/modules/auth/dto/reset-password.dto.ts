// src/modules/auth/dto/reset-password.dto.ts
import { IsString, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  resetToken: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short. It should be at least 8 characters.' })
  @MaxLength(20, { message: 'Password is too long. It should be at most 20 characters.' })
  newPassword: string;
}
