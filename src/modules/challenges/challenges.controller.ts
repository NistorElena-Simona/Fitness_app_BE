import { Controller, Post, Get, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';

@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  async createChallenge(@Body() createChallengeDto: CreateChallengeDto) {
    return this.challengesService.createChallenge(createChallengeDto);
  }

  @Get(':id')
  async getChallenge(@Param('id', ParseIntPipe) id: number) {
    return this.challengesService.getChallenge(id);
  }

  @Get()
  async getAllChallenges() {
    return this.challengesService.getAllChallenges();
  }

  @Get(':id/day/:dayNumber')
  async getDayExercises(
    @Param('id', ParseIntPipe) id: number,
    @Param('dayNumber', ParseIntPipe) dayNumber: number
  ) {
    return this.challengesService.getDayExercises(id, dayNumber);
  }
} 