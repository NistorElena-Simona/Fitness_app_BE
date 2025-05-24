import { PrismaService } from "src/database/prisma.service";
import { CreateChallengeDto } from "./dto/create-challenge.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ChallengesService {
  constructor(private prisma: PrismaService) {}

  async createChallenge(createChallengeDto: CreateChallengeDto) {
    return this.prisma.challenge.create({
      data: {
        name: createChallengeDto.name,
        description: createChallengeDto.description,
        duration: createChallengeDto.duration,
        days: {
          create: createChallengeDto.days.map(day => ({
            dayNumber: day.dayNumber,
            exercises: {
              create: day.exercises.map(ex => ({
                exerciseId: ex.exerciseId,
                sets: ex.sets,
                reps: ex.reps
              }))
            }
          }))
        }
      },
      include: {
        days: {
          include: {
            exercises: {
              include: {
                exercise: true
              }
            }
          }
        }
      }
    });
  }

  async getChallenge(id: number) {
    return this.prisma.challenge.findUnique({
      where: { id },
      include: {
        days: {
          include: {
            exercises: {
              include: {
                exercise: true
              }
            }
          }
        }
      }
    });
  }

  async getAllChallenges() {
    return this.prisma.challenge.findMany({
      include: {
        days: {
          include: {
            exercises: {
              include: {
                exercise: true
              }
            }
          }
        }
      }
    });
  }

  async getDayExercises(challengeId: number, dayNumber: number) {
    return this.prisma.day.findFirst({
      where: {
        challengeId,
        dayNumber
      },
      include: {
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    });
  }
} 