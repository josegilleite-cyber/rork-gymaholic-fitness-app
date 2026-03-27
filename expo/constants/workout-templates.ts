export interface WorkoutTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // minutes
  exercises: {
    exerciseId: string;
    sets: number;
    reps: number;
    restTime: number; // seconds
  }[];
}

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: 'push-day-beginner',
    name: 'Push Day - Beginner',
    description: 'Perfect for building chest, shoulders, and triceps',
    difficulty: 'Beginner',
    duration: 45,
    exercises: [
      { exerciseId: 'bench-press', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'incline-bench', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'overhead-press', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'lateral-raise', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'tricep-pushdown', sets: 3, reps: 12, restTime: 60 },
    ],
  },
  {
    id: 'pull-day-beginner',
    name: 'Pull Day - Beginner',
    description: 'Build a strong back and biceps',
    difficulty: 'Beginner',
    duration: 45,
    exercises: [
      { exerciseId: 'deadlift', sets: 3, reps: 8, restTime: 120 },
      { exerciseId: 'barbell-row', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'lat-pulldown', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'face-pulls', sets: 3, reps: 15, restTime: 60 },
      { exerciseId: 'bicep-curl', sets: 3, reps: 12, restTime: 60 },
    ],
  },
  {
    id: 'leg-day-beginner',
    name: 'Leg Day - Beginner',
    description: 'Build powerful legs and glutes',
    difficulty: 'Beginner',
    duration: 50,
    exercises: [
      { exerciseId: 'squat', sets: 3, reps: 10, restTime: 120 },
      { exerciseId: 'leg-press', sets: 3, reps: 12, restTime: 90 },
      { exerciseId: 'leg-curl', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'leg-extension', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'calf-raise', sets: 4, reps: 15, restTime: 45 },
    ],
  },
  {
    id: 'upper-body-intermediate',
    name: 'Upper Body - Intermediate',
    description: 'Complete upper body workout',
    difficulty: 'Intermediate',
    duration: 60,
    exercises: [
      { exerciseId: 'bench-press', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'barbell-row', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'overhead-press', sets: 3, reps: 10, restTime: 90 },
      { exerciseId: 'pull-ups', sets: 3, reps: 8, restTime: 90 },
      { exerciseId: 'tricep-extension', sets: 3, reps: 12, restTime: 60 },
      { exerciseId: 'hammer-curl', sets: 3, reps: 12, restTime: 60 },
    ],
  },
  {
    id: 'full-body-advanced',
    name: 'Full Body - Advanced',
    description: 'Intense full body compound workout',
    difficulty: 'Advanced',
    duration: 75,
    exercises: [
      { exerciseId: 'deadlift', sets: 4, reps: 5, restTime: 180 },
      { exerciseId: 'bench-press', sets: 4, reps: 6, restTime: 150 },
      { exerciseId: 'squat', sets: 4, reps: 6, restTime: 150 },
      { exerciseId: 'pull-ups', sets: 4, reps: 8, restTime: 120 },
      { exerciseId: 'overhead-press', sets: 3, reps: 8, restTime: 120 },
      { exerciseId: 'barbell-row', sets: 3, reps: 8, restTime: 90 },
    ],
  },
];
