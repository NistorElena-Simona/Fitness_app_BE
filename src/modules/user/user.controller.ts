import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.userService.register(dto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.userService.verifyEmail(token);
  }
}
