export interface NutritionGoal {
  id: string;
  name: string;
  description: string;
  targetCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
}

export interface Meal {
  id: string;
  name: string;
  type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: string[];
  instructions?: string;
}

export interface DailyNutrition {
  date: string;
  meals: Meal[];
  waterIntake: number; // ml
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFats: number;
}

// Nutrition Goals Templates
export const NUTRITION_GOALS: NutritionGoal[] = [
  {
    id: 'muscle-gain',
    name: 'Muscle Gain',
    description: 'Caloric surplus for building muscle',
    targetCalories: 2800,
    proteinGrams: 180,
    carbsGrams: 350,
    fatsGrams: 80,
  },
  {
    id: 'fat-loss',
    name: 'Fat Loss',
    description: 'Caloric deficit while preserving muscle',
    targetCalories: 2000,
    proteinGrams: 180,
    carbsGrams: 150,
    fatsGrams: 60,
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Maintain current body composition',
    targetCalories: 2400,
    proteinGrams: 160,
    carbsGrams: 250,
    fatsGrams: 70,
  },
  {
    id: 'lean-bulk',
    name: 'Lean Bulk',
    description: 'Slow muscle gain with minimal fat',
    targetCalories: 2600,
    proteinGrams: 170,
    carbsGrams: 300,
    fatsGrams: 75,
  },
];

// Sample Meals
export const SAMPLE_MEALS: Meal[] = [
  {
    id: 'protein-oatmeal',
    name: 'Protein Oatmeal Bowl',
    type: 'Breakfast',
    calories: 450,
    protein: 30,
    carbs: 55,
    fats: 12,
    ingredients: [
      '1 cup oats',
      '1 scoop protein powder',
      '1 banana',
      '1 tbsp peanut butter',
      '1 cup almond milk',
    ],
  },
  {
    id: 'chicken-rice',
    name: 'Chicken & Rice Bowl',
    type: 'Lunch',
    calories: 650,
    protein: 55,
    carbs: 70,
    fats: 15,
    ingredients: [
      '200g chicken breast',
      '1 cup brown rice',
      '1 cup broccoli',
      '1 tbsp olive oil',
      'Seasonings',
    ],
  },
  {
    id: 'salmon-sweet-potato',
    name: 'Salmon with Sweet Potato',
    type: 'Dinner',
    calories: 600,
    protein: 45,
    carbs: 50,
    fats: 22,
    ingredients: [
      '180g salmon fillet',
      '1 large sweet potato',
      '2 cups mixed vegetables',
      '1 tbsp olive oil',
      'Lemon & herbs',
    ],
  },
  {
    id: 'protein-shake',
    name: 'Post-Workout Shake',
    type: 'Snack',
    calories: 350,
    protein: 40,
    carbs: 35,
    fats: 8,
    ingredients: [
      '2 scoops protein powder',
      '1 banana',
      '1 cup almond milk',
      '1 tbsp honey',
      'Ice',
    ],
  },
  {
    id: 'greek-yogurt-bowl',
    name: 'Greek Yogurt & Berries',
    type: 'Snack',
    calories: 250,
    protein: 20,
    carbs: 30,
    fats: 6,
    ingredients: [
      '200g Greek yogurt',
      '1 cup mixed berries',
      '1 tbsp honey',
      '2 tbsp granola',
    ],
  },
];

// Calculate macros based on body weight and goal
export function calculateMacros(
  bodyWeight: number, // kg
  goal: 'muscle-gain' | 'fat-loss' | 'maintenance' | 'lean-bulk'
): NutritionGoal {
  const multipliers = {
    'muscle-gain': { cal: 40, protein: 2.2, carbs: 5, fats: 1 },
    'fat-loss': { cal: 28, protein: 2.4, carbs: 2, fats: 0.8 },
    'maintenance': { cal: 35, protein: 2, carbs: 3.5, fats: 1 },
    'lean-bulk': { cal: 37, protein: 2.1, carbs: 4, fats: 0.9 },
  };

  const multiplier = multipliers[goal];
  
  return {
    id: goal,
    name: NUTRITION_GOALS.find(g => g.id === goal)?.name || goal,
    description: NUTRITION_GOALS.find(g => g.id === goal)?.description || '',
    targetCalories: Math.round(bodyWeight * multiplier.cal),
    proteinGrams: Math.round(bodyWeight * multiplier.protein),
    carbsGrams: Math.round(bodyWeight * multiplier.carbs),
    fatsGrams: Math.round(bodyWeight * multiplier.fats),
  };
}
