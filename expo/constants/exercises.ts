export type ExerciseCategory = 'Push' | 'Pull' | 'Legs' | 'Core' | 'Cardio';
export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core' | 'Glutes' | 'Cardio';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroup: MuscleGroup;
  equipment: string;
}

export const EXERCISES: Exercise[] = [
  { id: 'bench-press', name: 'Barbell Bench Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Barbell' },
  { id: 'incline-bench', name: 'Incline Bench Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Barbell' },
  { id: 'dumbbell-press', name: 'Dumbbell Chest Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Dumbbell' },
  { id: 'chest-fly', name: 'Cable Chest Fly', category: 'Push', muscleGroup: 'Chest', equipment: 'Cable' },
  { id: 'push-ups', name: 'Push-ups', category: 'Push', muscleGroup: 'Chest', equipment: 'Bodyweight' },
  
  { id: 'overhead-press', name: 'Overhead Press', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Barbell' },
  { id: 'lateral-raise', name: 'Lateral Raises', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  { id: 'front-raise', name: 'Front Raises', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Dumbbell' },
  
  { id: 'deadlift', name: 'Deadlift', category: 'Pull', muscleGroup: 'Back', equipment: 'Barbell' },
  { id: 'barbell-row', name: 'Barbell Row', category: 'Pull', muscleGroup: 'Back', equipment: 'Barbell' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Pull', muscleGroup: 'Back', equipment: 'Cable' },
  { id: 'pull-ups', name: 'Pull-ups', category: 'Pull', muscleGroup: 'Back', equipment: 'Bodyweight' },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'Pull', muscleGroup: 'Back', equipment: 'Dumbbell' },
  { id: 'face-pulls', name: 'Face Pulls', category: 'Pull', muscleGroup: 'Back', equipment: 'Cable' },
  
  { id: 'bicep-curl', name: 'Barbell Bicep Curl', category: 'Pull', muscleGroup: 'Arms', equipment: 'Barbell' },
  { id: 'hammer-curl', name: 'Hammer Curls', category: 'Pull', muscleGroup: 'Arms', equipment: 'Dumbbell' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Push', muscleGroup: 'Arms', equipment: 'Cable' },
  { id: 'tricep-extension', name: 'Overhead Tricep Extension', category: 'Push', muscleGroup: 'Arms', equipment: 'Dumbbell' },
  
  { id: 'squat', name: 'Barbell Squat', category: 'Legs', muscleGroup: 'Legs', equipment: 'Barbell' },
  { id: 'front-squat', name: 'Front Squat', category: 'Legs', muscleGroup: 'Legs', equipment: 'Barbell' },
  { id: 'leg-press', name: 'Leg Press', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'leg-curl', name: 'Leg Curl', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'leg-extension', name: 'Leg Extension', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine' },
  { id: 'lunges', name: 'Walking Lunges', category: 'Legs', muscleGroup: 'Legs', equipment: 'Dumbbell' },
  { id: 'calf-raise', name: 'Calf Raises', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine' },
  
  { id: 'hip-thrust', name: 'Hip Thrust', category: 'Legs', muscleGroup: 'Glutes', equipment: 'Barbell' },
  { id: 'glute-bridge', name: 'Glute Bridge', category: 'Legs', muscleGroup: 'Glutes', equipment: 'Bodyweight' },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'Pull', muscleGroup: 'Glutes', equipment: 'Barbell' },
  
  { id: 'plank', name: 'Plank', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'crunches', name: 'Crunches', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'leg-raises', name: 'Hanging Leg Raises', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'russian-twist', name: 'Russian Twists', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight' },
  { id: 'cable-crunch', name: 'Cable Crunches', category: 'Core', muscleGroup: 'Core', equipment: 'Cable' },
];
