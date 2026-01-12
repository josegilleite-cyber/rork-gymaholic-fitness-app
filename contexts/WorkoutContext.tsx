import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import type { Workout } from '@/constants/types';

const STORAGE_KEY = '@gymaholic_workouts';

export const [WorkoutProvider, useWorkouts] = createContextHook(() => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const workoutsQuery = useQuery({
    queryKey: ['workouts'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const syncMutation = useMutation({
    mutationFn: async (newWorkouts: Workout[]) => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newWorkouts));
      return newWorkouts;
    },
  });

  useEffect(() => {
    if (workoutsQuery.data) {
      setWorkouts(workoutsQuery.data);
    }
  }, [workoutsQuery.data]);

  const addWorkout = (workout: Workout) => {
    const updated = [...workouts, workout];
    setWorkouts(updated);
    syncMutation.mutate(updated);
  };

  const deleteWorkout = (workoutId: string) => {
    const updated = workouts.filter(w => w.id !== workoutId);
    setWorkouts(updated);
    syncMutation.mutate(updated);
  };

  const getTotalVolume = () => {
    return workouts.reduce((total, workout) => total + workout.totalVolume, 0);
  };

  const getWorkoutCount = () => {
    return workouts.length;
  };

  return {
    workouts,
    addWorkout,
    deleteWorkout,
    getTotalVolume,
    getWorkoutCount,
    isLoading: workoutsQuery.isLoading,
  };
});
