// src/modules/admin/admin.controller.ts
import { Controller, Patch, Param, Body, Delete, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard'; 
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

 @Patch('add-role/:userId')
 async addRole(@Param('userId') userId: string, @Body() body: { role: Role }) {
   return this.adminService.addRole(userId, body.role);
 }

 @Delete('remove-role/:userId')
 async removeRole(@Param('userId') userId: string, @Body() body: { role: Role }) {
   return this.adminService.removeRole(userId, body.role);
 }

  @Delete('delete-user/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.adminService.deleteUser(userId);
  }

  @Put('activate-user/:userId')
  async activateUser(@Param('userId') userId: string) {
    return this.adminService.activateUser(userId);
  }

  @Put('deactivate-user/:userId')
  async deactivateUser(@Param('userId') userId: string) {
    return this.adminService.deactivateUser(userId);
  }
}
