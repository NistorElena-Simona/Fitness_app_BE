// src/modules/admin/admin.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async addRole(userId: string, role: Role) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (user.roles.includes(role)) {
      throw new ForbiddenException('User already has this role');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: { push: role },
      },
    });

    return updatedUser;
  }

  async removeRole(userId: string, role: Role) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    if (!user.roles.includes(role)) {
      throw new ForbiddenException('User does not have this role');
    }

    if (role === 'EMPLOYEE') {
      throw new ForbiddenException('Cannot remove the default EMPLOYEE role');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: { set: user.roles.filter((r) => r !== role) },
      },
    });

    return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');
    
    return this.prisma.user.delete({
      where: { id: userId },
    });
  }

  async activateUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: true },
    });
  }

  async deactivateUser(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data: { isActive: false },
    });
  }
}
