import { IsString, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  muscleId: number; // ID-ul mușchiului asociat
} 