import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Play, Info, Award } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EXERCISES } from '@/constants/exercises';

export default function ExerciseDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ exerciseId: string }>();
  const exercise = EXERCISES.find(ex => ex.id === params.exerciseId);

  if (!exercise) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Ejercicio no encontrado</Text>
      </View>
    );
  }

  const handlePlayVideo = async () => {
    if (exercise.videoUrl) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      try {
        await WebBrowser.openBrowserAsync(exercise.videoUrl, {
          presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
          controlsColor: '#FF6B35',
        });
      } catch (error) {
        Alert.alert('Error', 'No se pudo abrir el video');
      }
    }
  };

  const getTips = () => {
    // Tips genéricos basados en el tipo de ejercicio
    const tips = [
      'Mantén la forma correcta durante todo el movimiento',
      'Controla la fase excéntrica (bajada) del ejercicio',
      'Respira adecuadamente: exhala en el esfuerzo',
    ];

    if (exercise.muscleGroup === 'Back') {
      tips.push('Mantén la espalda recta y el core activado');
      tips.push('Enfócate en la conexión mente-músculo');
    } else if (exercise.muscleGroup === 'Chest') {
      tips.push('Baja hasta sentir un estiramiento en el pecho');
      tips.push('Mantén los omóplatos retraídos y estables');
    } else if (exercise.muscleGroup === 'Legs') {
      tips.push('Mantén las rodillas alineadas con los pies');
      tips.push('No dejes que las rodillas sobrepasen los dedos');
    }

    return tips;
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
            <Text style={styles.headerTitle}>Detalles del Ejercicio</Text>
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Text style={styles.metaText}>{exercise.muscleGroup}</Text>
              </View>
              <View style={styles.metaBadge}>
                <Text style={styles.metaText}>{exercise.equipment}</Text>
              </View>
              <View style={styles.metaBadge}>
                <Text style={styles.metaText}>{exercise.category}</Text>
              </View>
            </View>
          </View>

          {exercise.videoUrl && (
            <Pressable onPress={handlePlayVideo} style={styles.videoCard}>
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.videoGradient}
              >
                <View style={styles.playIconContainer}>
                  <Play size={48} color="#FFFFFF" fill="#FFFFFF" />
                </View>
                <Text style={styles.videoText}>Ver Video Tutorial</Text>
                <Text style={styles.videoSubtext}>Aprende la técnica correcta</Text>
              </LinearGradient>
            </Pressable>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Info size={20} color="#FF6B35" />
              <Text style={styles.sectionTitle}>Descripción</Text>
            </View>
            <Text style={styles.descriptionText}>
              {exercise.name} es un excelente ejercicio para trabajar {exercise.muscleGroup.toLowerCase()}. 
              Se realiza con {exercise.equipment.toLowerCase()} y es ideal para el desarrollo muscular 
              y el aumento de fuerza.
            </Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Award size={20} color="#FF6B35" />
              <Text style={styles.sectionTitle}>Consejos de Técnica</Text>
            </View>
            {getTips().map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <View style={styles.tipBullet} />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Músculos Trabajados</Text>
            <View style={styles.muscleTag}>
              <Text style={styles.muscleTagText}>Primario: {exercise.muscleGroup}</Text>
            </View>
          </View>
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
    paddingBottom: 40,
  },
  exerciseHeader: {
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 28,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  metaBadge: {
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  videoCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 24,
  },
  videoGradient: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  videoText: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  videoSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  descriptionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#CCCCCC',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B35',
    marginRight: 12,
    marginTop: 8,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#CCCCCC',
  },
  muscleTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  muscleTagText: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  errorText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 100,
  },
});
