import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService,
  ) {}

  async addFavorite(userId: string, exerciseId: number) {
    // Verifică dacă utilizatorul are deja 20 de favorite
    console.log("UserId:", userId);
    const favoriteCount = await this.prisma.favoriteExercise.count({
      where: { userId }
    });

    if (favoriteCount >= 20) {
      throw new Error('Maximum number of favorites reached (20)');
    }

    return this.prisma.favoriteExercise.create({
      data: {
        userId,
        exerciseId
      },
      include: {
        exercise: true
      }
    });
  }

  async removeFavorite(userId: string, exerciseId: number) {
    return this.prisma.favoriteExercise.delete({
      where: {
        userId_exerciseId: {
          userId,
          exerciseId
        }
      }
    });
  }

  async getUserFavorites(userId: string) {
    return this.prisma.favoriteExercise.findMany({
      where: { userId },
      include: {
        exercise: true
      }
    });
  }
} 