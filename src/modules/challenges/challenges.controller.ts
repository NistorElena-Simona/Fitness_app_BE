import { Controller, Post, Get, Param, Body, ParseIntPipe, Put } from '@nestjs/common';
import { ChallengesService } from './challenges.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import { UpdateChallengeDto } from './dto/update-challenge.dto';

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

  //probleme aici la PUT la challenges
  @Put(':id')
async updateChallenge(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateChallengeDto: UpdateChallengeDto
) {
  return this.challengesService.updateChallenge(id, updateChallengeDto);
}
} 