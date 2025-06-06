export class UpdateChallengeDto {
  name?: string;
  description?: string;
  duration?: number;
  days?: UpdateDayDto[];
}


export class UpdateDayDto {
  dayNumber: number;
  exercises: UpdateDayExerciseDto[];
}

export class UpdateDayExerciseDto {
  exerciseId: number;
  sets: number;
  reps: number;
}

