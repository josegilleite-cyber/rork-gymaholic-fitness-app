export type ExerciseCategory = 'Push' | 'Pull' | 'Legs' | 'Core' | 'Cardio';
export type MuscleGroup = 'Chest' | 'Back' | 'Shoulders' | 'Arms' | 'Legs' | 'Core' | 'Glutes' | 'Cardio';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  muscleGroup: MuscleGroup;
  equipment: string;
  videoUrl?: string;
}

export const EXERCISES: Exercise[] = [
  { id: 'bench-press', name: 'Barbell Bench Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg' },
  { id: 'incline-bench', name: 'Incline Bench Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=jPLdzuHckI8' },
  { id: 'dumbbell-press', name: 'Dumbbell Chest Press', category: 'Push', muscleGroup: 'Chest', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94' },
  { id: 'chest-fly', name: 'Cable Chest Fly', category: 'Push', muscleGroup: 'Chest', equipment: 'Cable', videoUrl: 'https://www.youtube.com/watch?v=Iwe6AmxVf7o' },
  { id: 'push-ups', name: 'Push-ups', category: 'Push', muscleGroup: 'Chest', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=IODxDxX7oi4' },
  
  { id: 'overhead-press', name: 'Overhead Press', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI' },
  { id: 'lateral-raise', name: 'Lateral Raises', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
  { id: 'front-raise', name: 'Front Raises', category: 'Push', muscleGroup: 'Shoulders', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=-t7fuZ0KhDA' },
  
  { id: 'deadlift', name: 'Deadlift', category: 'Pull', muscleGroup: 'Back', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=op9kVnSso6Q' },
  { id: 'barbell-row', name: 'Barbell Row', category: 'Pull', muscleGroup: 'Back', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=FWJR5Ve8bnQ' },
  { id: 'lat-pulldown', name: 'Lat Pulldown', category: 'Pull', muscleGroup: 'Back', equipment: 'Cable', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
  { id: 'pull-ups', name: 'Pull-ups', category: 'Pull', muscleGroup: 'Back', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g' },
  { id: 'dumbbell-row', name: 'Dumbbell Row', category: 'Pull', muscleGroup: 'Back', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=pYcpY20QaE8' },
  { id: 'face-pulls', name: 'Face Pulls', category: 'Pull', muscleGroup: 'Back', equipment: 'Cable', videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk' },
  
  { id: 'bicep-curl', name: 'Barbell Bicep Curl', category: 'Pull', muscleGroup: 'Arms', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo' },
  { id: 'hammer-curl', name: 'Hammer Curls', category: 'Pull', muscleGroup: 'Arms', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4' },
  { id: 'tricep-pushdown', name: 'Tricep Pushdown', category: 'Push', muscleGroup: 'Arms', equipment: 'Cable', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
  { id: 'tricep-extension', name: 'Overhead Tricep Extension', category: 'Push', muscleGroup: 'Arms', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=-Vyt2QdsR7E' },
  
  { id: 'squat', name: 'Barbell Squat', category: 'Legs', muscleGroup: 'Legs', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
  { id: 'front-squat', name: 'Front Squat', category: 'Legs', muscleGroup: 'Legs', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=uYumuL_G_V0' },
  { id: 'leg-press', name: 'Leg Press', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
  { id: 'leg-curl', name: 'Leg Curl', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine', videoUrl: 'https://www.youtube.com/watch?v=ELOCsoDSmrg' },
  { id: 'leg-extension', name: 'Leg Extension', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine', videoUrl: 'https://www.youtube.com/watch?v=YyvSfVjQeL0' },
  { id: 'lunges', name: 'Walking Lunges', category: 'Legs', muscleGroup: 'Legs', equipment: 'Dumbbell', videoUrl: 'https://www.youtube.com/watch?v=L8fvypPrzzs' },
  { id: 'calf-raise', name: 'Calf Raises', category: 'Legs', muscleGroup: 'Legs', equipment: 'Machine', videoUrl: 'https://www.youtube.com/watch?v=gwLzBJYoWlI' },
  
  { id: 'hip-thrust', name: 'Hip Thrust', category: 'Legs', muscleGroup: 'Glutes', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=xDmFkJxPzeM' },
  { id: 'glute-bridge', name: 'Glute Bridge', category: 'Legs', muscleGroup: 'Glutes', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=wPM8icPu6H8' },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', category: 'Pull', muscleGroup: 'Glutes', equipment: 'Barbell', videoUrl: 'https://www.youtube.com/watch?v=2SHsk9AzdjA' },
  
  { id: 'plank', name: 'Plank', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=pSHjTRCQxIw' },
  { id: 'crunches', name: 'Crunches', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
  { id: 'leg-raises', name: 'Hanging Leg Raises', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=Pr1ieGZ5atk' },
  { id: 'russian-twist', name: 'Russian Twists', category: 'Core', muscleGroup: 'Core', equipment: 'Bodyweight', videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI' },
  { id: 'cable-crunch', name: 'Cable Crunches', category: 'Core', muscleGroup: 'Core', equipment: 'Cable', videoUrl: 'https://www.youtube.com/watch?v=Ik3JkxRH3nA' },
];
