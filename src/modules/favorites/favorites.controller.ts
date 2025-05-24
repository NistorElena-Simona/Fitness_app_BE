import { Controller, Post, Delete, Get, Body, Param, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async addFavorite(
    @Req() req,
    @Body() createFavoriteDto: CreateFavoriteDto
  ) {
    console.log("request:", req);
    console.log("DTO:",createFavoriteDto);
    return this.favoritesService.addFavorite(req.user.userId, createFavoriteDto.exerciseId);
   
  }

  @Delete(':exerciseId')
  async removeFavorite(
    @Req() req,
    @Param('exerciseId', ParseIntPipe) exerciseId: number
  ) {
    return this.favoritesService.removeFavorite(req.user.userId, exerciseId);
  }

  @Get()
  async getUserFavorites(@Req() req) {
    return this.favoritesService.getUserFavorites(req.user.userId);
  }
} 