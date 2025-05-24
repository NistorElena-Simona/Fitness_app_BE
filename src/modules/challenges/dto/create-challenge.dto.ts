export class CreateChallengeDto {
  name: string;
  description: string;
  duration: number;
  days: CreateDayDto[];
}

export class CreateDayDto {
  dayNumber: number;
  exercises: CreateDayExerciseDto[];
}

export class CreateDayExerciseDto {
  exerciseId: number;
  sets: number;
  reps: number;
} 