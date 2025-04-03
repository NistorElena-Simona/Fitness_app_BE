import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: createExerciseDto,
    });
  }

  async findAll() {
    return this.prisma.exercise.findMany();
  }

  async findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: updateExerciseDto,
    });
  }

  async remove(id: number) {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async createBulk(exercises: CreateExerciseDto[]) {
    return Promise.all(
      exercises.map(exercise => this.create(exercise))
    );
  }
} 