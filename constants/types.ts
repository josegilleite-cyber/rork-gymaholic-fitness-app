export interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
  rpe?: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  date: Date;
  name: string;
  exercises: WorkoutExercise[];
  duration?: number;
  totalVolume: number;
}

export interface ProgressDataPoint {
  date: Date;
  value: number;
}
