import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dumbbell, TrendingUp, Target, Zap } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  return (
    <LinearGradient
      colors={['#0F0F0F', '#1A1A1A', '#0F0F0F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <View style={styles.iconContainer}>
            <Dumbbell size={56} color="#FF6B35" strokeWidth={2.5} />
          </View>
          <Text style={styles.title}>Gymaholic</Text>
          <Text style={styles.subtitle}>Progressive Overload Made Simple</Text>
        </Animated.View>

        <Animated.View 
          style={[
            styles.features,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <FeatureCard
            icon={<Target size={24} color="#FF6B35" />}
            title="Track Every Rep"
            description="Log workouts in seconds with smart auto-fill"
          />
          <FeatureCard
            icon={<TrendingUp size={24} color="#FF6B35" />}
            title="Visualize Progress"
            description="Beautiful charts showing your strength gains"
          />
          <FeatureCard
            icon={<Zap size={24} color="#FF6B35" />}
            title="Beat Yesterday"
            description="Progressive overload system that works"
          />
        </Animated.View>

        <Animated.View 
          style={[
            styles.buttonContainer,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/workout')}
          >
            <LinearGradient
              colors={['#FF6B35', '#F7931E']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.primaryButtonText}>Start Training</Text>
            </LinearGradient>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.push('/history')}
          >
            <Text style={styles.secondaryButtonText}>View History</Text>
          </Pressable>

          <Text style={styles.promoText}>
            7-day free trial • Then $4.99/mo
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.privacyLink,
              pressed && { opacity: 0.6 },
            ]}
            onPress={() => router.push('/privacy-policy')}
          >
            <Text style={styles.privacyLinkText}>Privacy Policy</Text>
          </Pressable>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <View style={styles.featureCard}>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 48,
    fontWeight: '800' as const,
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 18,
    color: '#999999',
    fontWeight: '500' as const,
  },
  features: {
    gap: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 17,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#999999',
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  promoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  privacyLink: {
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  privacyLinkText: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'underline',
  },
});
