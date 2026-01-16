import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Plus, ArrowLeft, Clock, Trash2, Check, Save, Play } from 'lucide-react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, ScrollView, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXERCISES, Exercise } from '@/constants/exercises';
import type { WorkoutExercise, Workout } from '@/constants/types';
import { useWorkouts } from '@/contexts/WorkoutContext';

export default function WorkoutScreen() {
  const router = useRouter();
  const { addWorkout } = useWorkouts();
  const [workoutName] = useState<string>('Push Day');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);
  const [showExercisePicker, setShowExercisePicker] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [startTime] = useState<Date>(new Date());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateTotalVolume = () => {
    return exercises.reduce((total, exercise) => {
      const exerciseVolume = exercise.sets
        .filter(set => set.completed)
        .reduce((sum, set) => sum + (set.weight * set.reps), 0);
      return total + exerciseVolume;
    }, 0);
  };

  const saveWorkout = () => {
    if (exercises.length === 0) {
      Alert.alert('No Exercises', 'Add at least one exercise to save the workout.');
      return;
    }

    const completedSets = exercises.some(ex => ex.sets.some(set => set.completed));
    if (!completedSets) {
      Alert.alert('No Sets Completed', 'Complete at least one set to save the workout.');
      return;
    }

    const workout: Workout = {
      id: Date.now().toString(),
      date: startTime,
      name: workoutName,
      exercises: exercises,
      duration: elapsedSeconds,
      totalVolume: calculateTotalVolume(),
    };

    addWorkout(workout);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Workout Saved!',
      `Great job! You completed ${workout.exercises.length} exercises with ${Math.round(workout.totalVolume)} kg total volume.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const addExercise = (exercise: Exercise) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newExercise: WorkoutExercise = {
      id: Date.now().toString(),
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: [
        { id: '1', weight: 0, reps: 0, completed: false },
      ],
    };
    setExercises([...exercises, newExercise]);
    setShowExercisePicker(false);
    setSearchQuery('');
  };

  const addSet = (exerciseId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        const lastSet = ex.sets[ex.sets.length - 1];
        return {
          ...ex,
          sets: [...ex.sets, {
            id: Date.now().toString(),
            weight: lastSet?.weight || 0,
            reps: lastSet?.reps || 0,
            completed: false,
          }],
        };
      }
      return ex;
    }));
  };

  const removeExercise = (exerciseId: string) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    setExercises(exercises.filter(ex => ex.id !== exerciseId));
  };

  const updateSet = (exerciseId: string, setId: string, field: 'weight' | 'reps', value: number) => {
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, [field]: value } : set
          ),
        };
      }
      return ex;
    }));
  };

  const toggleSetComplete = (exerciseId: string, setId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setExercises(exercises.map(ex => {
      if (ex.id === exerciseId) {
        return {
          ...ex,
          sets: ex.sets.map(set => 
            set.id === setId ? { ...set, completed: !set.completed } : set
          ),
        };
      }
      return ex;
    }));
  };

  const filteredExercises = EXERCISES.filter(ex =>
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0F0F', '#1A1A1A']}
        style={styles.gradient}
      >
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.timerBadge}>
            <Clock size={16} color="#FF6B35" />
            <Text style={styles.timerText}>{formatTime(elapsedSeconds)}</Text>
          </View>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>{workoutName}</Text>
            <Pressable onPress={saveWorkout} style={styles.saveButton}>
              <Save size={20} color="#FF6B35" />
            </Pressable>
          </View>
        </SafeAreaView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {exercises.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No exercises yet</Text>
              <Text style={styles.emptyStateSubtext}>Tap the button below to add exercises</Text>
            </View>
          ) : (
            exercises.map(exercise => (
              <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.exerciseName}</Text>
                  <Pressable onPress={() => removeExercise(exercise.id)} style={styles.deleteButton}>
                    <Trash2 size={18} color="#FF4444" />
                  </Pressable>
                </View>

                <View style={styles.setHeaderRow}>
                  <Text style={[styles.setHeaderText, styles.setNumberCol]}>Set</Text>
                  <Text style={[styles.setHeaderText, styles.setDataCol]}>Weight</Text>
                  <Text style={[styles.setHeaderText, styles.setDataCol]}>Reps</Text>
                  <View style={styles.setCheckCol} />
                </View>

                {exercise.sets.map((set, index) => (
                  <View key={set.id} style={styles.setRow}>
                    <Text style={[styles.setNumber, styles.setNumberCol]}>{index + 1}</Text>
                    <TextInput
                      style={[styles.setInput, styles.setDataCol, set.completed && styles.setInputCompleted]}
                      value={set.weight > 0 ? set.weight.toString() : ''}
                      onChangeText={(text) => updateSet(exercise.id, set.id, 'weight', parseFloat(text) || 0)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#444"
                    />
                    <TextInput
                      style={[styles.setInput, styles.setDataCol, set.completed && styles.setInputCompleted]}
                      value={set.reps > 0 ? set.reps.toString() : ''}
                      onChangeText={(text) => updateSet(exercise.id, set.id, 'reps', parseInt(text) || 0)}
                      keyboardType="numeric"
                      placeholder="0"
                      placeholderTextColor="#444"
                    />
                    <Pressable
                      onPress={() => toggleSetComplete(exercise.id, set.id)}
                      style={[styles.checkButton, set.completed && styles.checkButtonActive, styles.setCheckCol]}
                    >
                      {set.completed && <Check size={16} color="#FFFFFF" />}
                    </Pressable>
                  </View>
                ))}

                <Pressable onPress={() => addSet(exercise.id)} style={styles.addSetButton}>
                  <Plus size={18} color="#FF6B35" />
                  <Text style={styles.addSetText}>Add Set</Text>
                </Pressable>
              </View>
            ))
          )}
        </ScrollView>

        <SafeAreaView edges={['bottom']} style={styles.footer}>
          <Pressable
            onPress={() => setShowExercisePicker(true)}
            style={styles.addExerciseButton}
          >
            <LinearGradient
              colors={['#FF6B35', '#F7931E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.addExerciseGradient}
            >
              <Plus size={24} color="#FFFFFF" />
              <Text style={styles.addExerciseText}>Add Exercise</Text>
            </LinearGradient>
          </Pressable>
        </SafeAreaView>

        <Modal
          visible={showExercisePicker}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={() => setShowExercisePicker(false)}
        >
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={['#0F0F0F', '#1A1A1A']}
              style={styles.modalGradient}
            >
              <SafeAreaView edges={['top']} style={styles.modalSafeArea}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Add Exercise</Text>
                  <Pressable onPress={() => setShowExercisePicker(false)}>
                    <Text style={styles.modalClose}>Done</Text>
                  </Pressable>
                </View>
                <TextInput
                  style={styles.searchInput}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search exercises..."
                  placeholderTextColor="#666"
                />
              </SafeAreaView>

              <ScrollView style={styles.exerciseList}>
                {filteredExercises.map(exercise => (
                  <View key={exercise.id} style={styles.exerciseItemContainer}>
                    <Pressable
                      onPress={() => addExercise(exercise)}
                      style={styles.exerciseItem}
                    >
                      <View style={styles.exerciseItemInfo}>
                        <Text style={styles.exerciseItemName}>{exercise.name}</Text>
                        <Text style={styles.exerciseItemMeta}>
                          {exercise.muscleGroup} • {exercise.equipment}
                        </Text>
                      </View>
                      <View style={styles.exerciseItemActions}>
                        {exercise.videoUrl && (
                          <Pressable
                            onPress={(e) => {
                              e.stopPropagation();
                              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                              router.push({
                                pathname: '/exercise-detail',
                                params: { exerciseId: exercise.id }
                              });
                            }}
                            style={styles.videoButton}
                          >
                            <Play size={18} color="#FF6B35" />
                          </Pressable>
                        )}
                        <Plus size={20} color="#FF6B35" />
                      </View>
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  gradient: {
    flex: 1,
  },
  safeArea: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  timerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  saveButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  exerciseCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  deleteButton: {
    padding: 4,
  },
  setHeaderRow: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  setHeaderText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: '#666666',
    textTransform: 'uppercase' as const,
  },
  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  setNumberCol: {
    width: 40,
  },
  setDataCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  setCheckCol: {
    width: 40,
    alignItems: 'center',
  },
  setNumber: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  setInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  setInputCompleted: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
  },
  checkButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  addSetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 8,
    gap: 6,
  },
  addSetText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addExerciseButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  addExerciseGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  addExerciseText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  modalGradient: {
    flex: 1,
  },
  modalSafeArea: {
    paddingHorizontal: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  modalClose: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  searchInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  exerciseList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  exerciseItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  exerciseItemInfo: {
    flex: 1,
  },
  exerciseItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  videoButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  exerciseItemName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exerciseItemMeta: {
    fontSize: 13,
    color: '#666666',
  },
});
