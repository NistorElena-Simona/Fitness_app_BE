import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No specific role required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Access Denied: No token provided');
    }

    const decodedToken = this.jwtService.decode(token) as { roles: Role[] };

    if (!decodedToken || !decodedToken.roles) {
      throw new ForbiddenException('Access Denied: Invalid token');
    }

    const userRoles = decodedToken.roles;

  
    const roleHierarchy: Record<Role, Role[]> = {
      [Role.ADMIN]: [Role.ADMIN, Role.MANAGER, Role.EMPLOYEE], 
      [Role.MANAGER]: [Role.MANAGER, Role.EMPLOYEE],
      [Role.EMPLOYEE]: [Role.EMPLOYEE], 
    };

    const userPermissions = new Set<Role>();

    userRoles.forEach((role) => {
      if (roleHierarchy[role]) {
        roleHierarchy[role].forEach((r) => userPermissions.add(r));
      }
    });

    const hasPermission = requiredRoles.some((role) => userPermissions.has(role));

    if (!hasPermission) {
      throw new ForbiddenException('Access Denied: Insufficient permissions');
    }

    return true;
  }
}
