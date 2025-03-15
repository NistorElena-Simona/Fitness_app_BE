import { 
  Controller, Patch, Param, Body, Delete, Put, UseGuards 
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';


export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('add-role/:userId')
  @Roles(Role.ADMIN)
  async addRole(@Param('userId') userId: string, @Body() body: { role: Role }) {
    return this.adminService.addRole(userId, body.role);
  }

  @Delete('remove-role/:userId')
  @Roles(Role.ADMIN)
  async removeRole(@Param('userId') userId: string, @Body() body: { role: Role }) {
    return this.adminService.removeRole(userId, body.role);
  }

  @Delete('delete-user/:userId')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Put('activate-user/:userId')
  @Roles(Role.ADMIN, Role.MANAGER)
  async activateUser(@Param('userId') userId: string) {
    return this.adminService.activateUser(userId);
  }

  @Put('deactivate-user/:userId')
  @Roles(Role.ADMIN, Role.MANAGER)
  async deactivateUser(@Param('userId') userId: string) {
    return this.adminService.deactivateUser(userId);
  }
}
