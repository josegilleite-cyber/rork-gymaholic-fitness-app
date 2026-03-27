import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, TrendingUp } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useWorkouts } from '@/contexts/WorkoutContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { workouts, getWorkoutCount, getTotalVolume } = useWorkouts();

  const workoutCount = getWorkoutCount();
  const totalVolume = getTotalVolume();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0F0F', '#1A1A1A']}
        style={styles.gradient}
      >
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Workout History</Text>
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Calendar size={20} color="#FF6B35" />
              </View>
              <Text style={styles.statValue}>{workoutCount}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <TrendingUp size={20} color="#FF6B35" />
              </View>
              <Text style={styles.statValue}>{Math.round(totalVolume)} kg</Text>
              <Text style={styles.statLabel}>Total Volume</Text>
            </View>
          </View>

          {workouts.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No workouts yet</Text>
              <Text style={styles.emptyStateSubtext}>Complete your first workout to see it here</Text>
            </View>
          ) : (
            workouts.map((workout) => (
              <View key={workout.id} style={styles.workoutCard}>
                <View style={styles.workoutHeader}>
                  <Text style={styles.workoutName}>{workout.name}</Text>
                  <Text style={styles.workoutDate}>
                    {new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </Text>
                </View>
                <View style={styles.workoutStats}>
                  <Text style={styles.workoutStat}>{workout.exercises.length} exercises</Text>
                  <Text style={styles.workoutStat}>•</Text>
                  <Text style={styles.workoutStat}>{Math.round(workout.totalVolume)} kg</Text>
                  {workout.duration && (
                    <>
                      <Text style={styles.workoutStat}>•</Text>
                      <Text style={styles.workoutStat}>{Math.round(workout.duration / 60)} min</Text>
                    </>
                  )}
                </View>
              </View>
            ))
          )}
        </ScrollView>
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
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500' as const,
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
    textAlign: 'center',
  },
  workoutCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  workoutDate: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#666666',
  },
  workoutStats: {
    flexDirection: 'row',
    gap: 8,
  },
  workoutStat: {
    fontSize: 14,
    color: '#999999',
  },
});
