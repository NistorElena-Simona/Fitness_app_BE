import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface'; // Ensure this is defined
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts JWT from Authorization header
      secretOrKey: process.env.JWT_SECRET, // Secret key from environment variables
    });
  }

  async validate(payload: JwtPayload) {
    // Check if user exists, or add any other validation logic
    console.log('Decoded JWT Payload:', payload);
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}
