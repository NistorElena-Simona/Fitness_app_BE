import { Controller, Post, Body, Get, Query ,UseGuards, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getUserProfile(@Req() req) {
    const token = req.headers.authorization.split(' ')[1]; 
    const user = await this.userService.getUserInfoFromToken(token);
    return user;
  }
}
