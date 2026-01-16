import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Dumbbell, Clock, TrendingUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WORKOUT_TEMPLATES, WorkoutTemplate } from '@/constants/workout-templates';

type DifficultyFilter = 'All' | 'Beginner' | 'Intermediate' | 'Advanced';

export default function ExercisesScreen() {
  const router = useRouter();
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('All');

  const filteredTemplates = difficultyFilter === 'All' 
    ? WORKOUT_TEMPLATES 
    : WORKOUT_TEMPLATES.filter(t => t.difficulty === difficultyFilter);

  const handleSelectTemplate = (template: WorkoutTemplate) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // Aquí puedes implementar la lógica para cargar el template en el workout
    router.back();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4CAF50';
      case 'Intermediate': return '#FF9800';
      case 'Advanced': return '#F44336';
      default: return '#999999';
    }
  };

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
            <Text style={styles.headerTitle}>Programas de Entrenamiento</Text>
            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.filterContainer}>
            {(['All', 'Beginner', 'Intermediate', 'Advanced'] as DifficultyFilter[]).map((filter) => (
              <Pressable
                key={filter}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setDifficultyFilter(filter);
                }}
                style={[
                  styles.filterButton,
                  difficultyFilter === filter && styles.filterButtonActive,
                ]}
              >
                <Text style={[
                  styles.filterText,
                  difficultyFilter === filter && styles.filterTextActive,
                ]}>
                  {filter}
                </Text>
              </Pressable>
            ))}
          </View>
        </SafeAreaView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          {filteredTemplates.map((template) => (
            <Pressable
              key={template.id}
              onPress={() => handleSelectTemplate(template)}
              style={styles.templateCard}
            >
              <View style={styles.templateHeader}>
                <View style={styles.templateIcon}>
                  <Dumbbell size={24} color="#FF6B35" />
                </View>
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>{template.description}</Text>
                </View>
              </View>
              
              <View style={styles.templateMeta}>
                <View style={styles.metaItem}>
                  <Clock size={16} color="#999999" />
                  <Text style={styles.metaText}>{template.duration} min</Text>
                </View>
                <View style={styles.metaItem}>
                  <TrendingUp size={16} color="#999999" />
                  <Text style={styles.metaText}>{template.exercises.length} ejercicios</Text>
                </View>
                <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(template.difficulty) + '20' }]}>
                  <Text style={[styles.difficultyText, { color: getDifficultyColor(template.difficulty) }]}>
                    {template.difficulty}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
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
  filterContainer: {
    flexDirection: 'row',
    gap: 8,
    paddingBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  filterButtonActive: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    borderColor: '#FF6B35',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#999999',
  },
  filterTextActive: {
    color: '#FF6B35',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  templateCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  templateHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  templateIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  templateInfo: {
    flex: 1,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  templateDescription: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  templateMeta: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#999999',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '700' as const,
  },
});
