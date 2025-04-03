import { Module } from '@nestjs/common';
import { MusclesController } from './muscles.controller';
import { MusclesService } from './muscles.service';
import { PrismaService } from 'src/database/prisma.service';


@Module({
  controllers: [MusclesController],
  providers: [MusclesService, PrismaService],
})
export class MusclesModule {} 