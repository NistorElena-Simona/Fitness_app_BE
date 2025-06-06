import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Access Denied: No token provided');
    }

    const decodedToken = this.jwtService.decode(token) as { sub: string };

    if (!decodedToken || !decodedToken.sub) {
      throw new ForbiddenException('Access Denied: Invalid token');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: decodedToken.sub },
      select: { isPremium : true },
    });

    if (!user || !user.isPremium ) {
      throw new ForbiddenException('Access Denied: Premium subscription required');
    }

    return true;
  }
} 