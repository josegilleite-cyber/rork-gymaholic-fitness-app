import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#0F0F0F', '#1A1A1A', '#0F0F0F']}
      style={styles.container}
    >
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <ArrowLeft size={24} color="#FFFFFF" />
          </Pressable>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.lastUpdated}>Last Updated: January 12, 2026</Text>

          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.paragraph}>
            Gymaholic collects and stores workout data locally on your device, including exercise logs, sets, reps, weights, and workout history. This data is stored using AsyncStorage and remains on your device.
          </Text>

          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.paragraph}>
            Your workout data is used solely to provide you with fitness tracking features, including:
          </Text>
          <Text style={styles.bulletPoint}>• Tracking your workout progress and history</Text>
          <Text style={styles.bulletPoint}>• Calculating total volume and workout statistics</Text>
          <Text style={styles.bulletPoint}>• Providing personalized workout insights</Text>

          <Text style={styles.sectionTitle}>3. Data Storage and Security</Text>
          <Text style={styles.paragraph}>
            All workout data is stored locally on your device. We do not transmit, share, or store your personal workout data on external servers. Your data remains private and under your control.
          </Text>

          <Text style={styles.sectionTitle}>4. Permissions</Text>
          <Text style={styles.paragraph}>
            Gymaholic may request the following permissions:
          </Text>
          <Text style={styles.bulletPoint}>• Vibration: For haptic feedback during workouts</Text>
          <Text style={styles.bulletPoint}>• Storage: To save workout data locally on your device</Text>

          <Text style={styles.sectionTitle}>5. Third-Party Services</Text>
          <Text style={styles.paragraph}>
            Gymaholic does not integrate with third-party analytics, advertising, or tracking services. Your workout sessions remain completely private.
          </Text>

          <Text style={styles.sectionTitle}>6. Data Deletion</Text>
          <Text style={styles.paragraph}>
            You can delete your workout data at any time through the app's history screen. Uninstalling the app will permanently remove all locally stored data.
          </Text>

          <Text style={styles.sectionTitle}>7. Children's Privacy</Text>
          <Text style={styles.paragraph}>
            Gymaholic does not knowingly collect information from children under 13 years of age. The app is intended for users aged 13 and above.
          </Text>

          <Text style={styles.sectionTitle}>8. Changes to This Policy</Text>
          <Text style={styles.paragraph}>
            We may update this Privacy Policy from time to time. Changes will be reflected with an updated "Last Updated" date at the top of this page.
          </Text>

          <Text style={styles.sectionTitle}>9. Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </Text>
          <Text style={styles.contactText}>support@gymaholic.app</Text>

          <View style={styles.bottomSpacer} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 24,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 16,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#CCCCCC',
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 16,
  },
  contactText: {
    fontSize: 15,
    color: '#FF6B35',
    lineHeight: 24,
    marginTop: 8,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
