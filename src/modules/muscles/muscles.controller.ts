import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';

import { CreateMuscleDto } from './dto/create-muscle.dto';
import { MusclesService } from './muscles.service';

@Controller('muscles')
export class MusclesController {
  constructor(private readonly musclesService: MusclesService) {}

  @Post()
  async create(@Body() createMuscleDto: CreateMuscleDto) {
    return this.musclesService.create(createMuscleDto);
  }

  @Get()
  async findAll() {
    return this.musclesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.musclesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMuscleDto: CreateMuscleDto
  ) {
    return this.musclesService.update(id, updateMuscleDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.musclesService.remove(id);
  }
}