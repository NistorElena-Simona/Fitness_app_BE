import { Injectable } from '@nestjs/common';

import { CreateMuscleDto } from './dto/create-muscle.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MusclesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMuscleDto: CreateMuscleDto) {
    return this.prisma.muscle.create({
      data: createMuscleDto,
    });
  }

  async findAll() {
    return this.prisma.muscle.findMany();
  }

  async findOne(id: number) {
    return this.prisma.muscle.findUnique({
      where: {
        id: +id
      }
    });
  }
s
  async update(id: number, updateMuscleDto: CreateMuscleDto) {
    return this.prisma.muscle.update({
      where: {
        id: +id
      },
      data: updateMuscleDto
    });
  }

  async remove(id: number) {
    return this.prisma.muscle.delete({
      where: {
        id: +id
      }
    });
  }
} 