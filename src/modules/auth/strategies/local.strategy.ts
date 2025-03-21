import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user || !(await this.userService.checkPassword(user, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
