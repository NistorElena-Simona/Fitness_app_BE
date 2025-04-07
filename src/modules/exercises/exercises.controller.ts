import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { CreateBulkExercisesDto } from './dto/create-bulk-exercises.dto';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Post('bulk')
  async createBulk(@Body() createBulkExercisesDto: CreateBulkExercisesDto) {
    return this.exercisesService.createBulk(createBulkExercisesDto.exercises);
  }

  @Get()
  async findAll() {
    return this.exercisesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: CreateExerciseDto
  ) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }

  @Get('muscle/:muscleId')
  async findByMuscleId(@Param('muscleId', ParseIntPipe) muscleId: number) {
    return this.exercisesService.findByMuscleId(muscleId);
  }
}