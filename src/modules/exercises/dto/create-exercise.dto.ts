import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
  
  @IsNumber()
  muscleId: number; // ID-ul mușchiului asociat

  @IsOptional()
  @IsString()
  videoUrl?: string;
  
} 