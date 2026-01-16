import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ArrowLeft, Check, Crown, Zap, TrendingUp } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PlanType = 'monthly' | 'yearly';

export default function PricingScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');

  const handleSelectPlan = (plan: PlanType) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedPlan(plan);
  };

  const handleSubscribe = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      'Suscripción Premium',
      `Has seleccionado el plan ${selectedPlan === 'monthly' ? 'Mensual' : 'Anual'}.\n\nLa integración con sistemas de pago estará disponible próximamente.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  const handleRestorePurchases = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Restaurar Compras',
      'La restauración de compras estará disponible cuando se integre el sistema de pagos.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0F0F0F', '#1A1A1A', '#0F0F0F']}
        style={styles.gradient}
      >
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft size={24} color="#FFFFFF" />
            </Pressable>
            <Text style={styles.headerTitle}>Premium</Text>
            <View style={styles.headerSpacer} />
          </View>
        </SafeAreaView>

        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.heroSection}>
            <View style={styles.crownIcon}>
              <Crown size={48} color="#FF6B35" />
            </View>
            <Text style={styles.heroTitle}>Desbloquea Todo el Potencial</Text>
            <Text style={styles.heroSubtitle}>
              Acceso ilimitado a programas de hipertrofia y seguimiento avanzado
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <FeatureItem
              icon={<Zap size={22} color="#FF6B35" />}
              title="Programas de Hipertrofia"
              description="8+ programas profesionales para máximo crecimiento muscular"
            />
            <FeatureItem
              icon={<TrendingUp size={22} color="#FF6B35" />}
              title="Seguimiento Avanzado"
              description="Gráficos detallados y análisis de progreso"
            />
            <FeatureItem
              icon={<Check size={22} color="#FF6B35" />}
              title="Sin Anuncios"
              description="Entrena sin interrupciones ni distracciones"
            />
            <FeatureItem
              icon={<Check size={22} color="#FF6B35" />}
              title="Plantillas Personalizadas"
              description="Crea y guarda tus propios programas"
            />
          </View>

          <View style={styles.plansSection}>
            <Pressable
              onPress={() => handleSelectPlan('yearly')}
              style={[
                styles.planCard,
                selectedPlan === 'yearly' && styles.planCardSelected,
              ]}
            >
              <View style={styles.planBadge}>
                <Text style={styles.planBadgeText}>AHORRA 50%</Text>
              </View>
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Plan Anual</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>€29.99</Text>
                  <Text style={styles.planPeriod}>/año</Text>
                </View>
                <Text style={styles.planDetails}>Solo €2.50/mes • Facturado anualmente</Text>
              </View>
              {selectedPlan === 'yearly' && (
                <View style={styles.selectedIndicator}>
                  <Check size={20} color="#FFFFFF" />
                </View>
              )}
            </Pressable>

            <Pressable
              onPress={() => handleSelectPlan('monthly')}
              style={[
                styles.planCard,
                selectedPlan === 'monthly' && styles.planCardSelected,
              ]}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>Plan Mensual</Text>
                <View style={styles.planPriceRow}>
                  <Text style={styles.planPrice}>€4.99</Text>
                  <Text style={styles.planPeriod}>/mes</Text>
                </View>
                <Text style={styles.planDetails}>Facturado mensualmente</Text>
              </View>
              {selectedPlan === 'monthly' && (
                <View style={styles.selectedIndicator}>
                  <Check size={20} color="#FFFFFF" />
                </View>
              )}
            </Pressable>
          </View>

          <View style={styles.ctaSection}>
            <Pressable
              onPress={handleSubscribe}
              style={styles.subscribeButton}
            >
              <LinearGradient
                colors={['#FF6B35', '#F7931E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.subscribeGradient}
              >
                <Crown size={24} color="#FFFFFF" />
                <Text style={styles.subscribeText}>
                  Suscribirse - {selectedPlan === 'monthly' ? '€4.99/mes' : '€29.99/año'}
                </Text>
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={handleRestorePurchases}
              style={styles.restoreButton}
            >
              <Text style={styles.restoreText}>Restaurar Compras</Text>
            </Pressable>

            <Text style={styles.disclaimerText}>
              Prueba gratis por 7 días, luego se te cobrará automáticamente.{'\n'}
              Cancela en cualquier momento desde la configuración de tu cuenta.
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

function FeatureItem({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <View style={styles.featureItem}>
      <View style={styles.featureIcon}>{icon}</View>
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureDescription}>{description}</Text>
      </View>
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
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  crownIcon: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  featuresSection: {
    marginBottom: 32,
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  plansSection: {
    marginBottom: 32,
    gap: 16,
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
  },
  planCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
  },
  planBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  planBadgeText: {
    fontSize: 12,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  planHeader: {
    marginTop: 8,
  },
  planName: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  planPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 36,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    letterSpacing: -1,
  },
  planPeriod: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#999999',
    marginLeft: 4,
  },
  planDetails: {
    fontSize: 14,
    color: '#999999',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B35',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSection: {
    gap: 16,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  subscribeText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  restoreButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  restoreText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
});
