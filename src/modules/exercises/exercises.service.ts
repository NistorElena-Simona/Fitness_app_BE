import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createExerciseDto: CreateExerciseDto) {
    return this.prisma.exercise.create({
      data: {
        name: createExerciseDto.name,
        muscleId: createExerciseDto.muscleId,
        description: createExerciseDto.description,
        imageUrl: createExerciseDto.imageUrl,
        videoUrl: createExerciseDto.videoUrl
      },
    });
  }

  async findAll() {
    const exercises = await this.prisma.exercise.findMany({
      orderBy: {
        id: 'asc'
      }
    });
    
    console.log('Before sorting:', exercises.map(e => e.id));
    
    const sortedExercises = exercises.sort((a, b) => Number(a.id) - Number(b.id));
    
    console.log('After sorting:', sortedExercises.map(e => e.id));
    
    return sortedExercises;
  }

  async findOne(id: number) {
    return this.prisma.exercise.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateExerciseDto: CreateExerciseDto) {
    console.log('Updating exercise with ID:', id);
    console.log('Update data:', updateExerciseDto);

    const exercise = await this.prisma.exercise.findUnique({
      where: { id }
    });

    console.log('Found exercise:', exercise);

    if (!exercise) {
      throw new Error(`Exercise with ID ${id} not found`);
    }

    return this.prisma.exercise.update({
      where: { id },
      data: {
        name: updateExerciseDto.name,
        description: updateExerciseDto.description,
        imageUrl: updateExerciseDto.imageUrl,
        muscleId: updateExerciseDto.muscleId,
        videoUrl: updateExerciseDto.videoUrl
      }
    });
  }

  async remove(id: number) {
    return this.prisma.exercise.delete({
      where: { id },
    });
  }

  async createBulk(exercises: CreateExerciseDto[]) {
    return this.prisma.$transaction(async (prisma) => {
      // Creăm exercițiile unul câte unul pentru a păstra ordinea
      const createdExercises = [];
      
      for (const exercise of exercises) {
        const created = await prisma.exercise.create({
          data: {
            name: exercise.name,
            muscleId: exercise.muscleId,
            description: exercise.description,
            imageUrl: exercise.imageUrl,
            videoUrl: exercise.videoUrl
          }
        });
        createdExercises.push(created);
      }

      return createdExercises;
    });
  }

  async findByMuscleId(muscleId: number) {
    console.log("Here i am ");
    return this.prisma.exercise.findMany({
      where: {
        muscleId: muscleId
      },
      orderBy: {
        id: 'asc' // Asigură-te că exercițiile sunt returnate în ordine crescătoare
      }
    });
  }
} 