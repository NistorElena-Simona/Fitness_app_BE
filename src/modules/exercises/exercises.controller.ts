import { Controller, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  async findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.exercisesService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateExerciseDto: CreateExerciseDto) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.exercisesService.remove(id);
  }
}