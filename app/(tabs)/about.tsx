import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const dynamicStyles = StyleSheet.create({
    title: {
      color: theme.onBackground,
    },
    description: {
      color: theme.onBackground,
    },
    bodyText: {
      color: theme.onSurfaceVariant,
    },
    sectionTitle: {
      color: theme.onBackground,
    },
    feature: {
      color: theme.onSurfaceVariant,
    },
    headerDecoration: {
      backgroundColor: theme.onBackground,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedView style={styles.content}>
            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText
                variant="heading"
                size="3xl"
                weight="bold"
                style={[styles.title, dynamicStyles.title]}
              >
                🧠 About Memory Game Pro
              </ThemedText>
              <ThemedView
                style={[
                  styles.headerDecoration,
                  dynamicStyles.headerDecoration,
                ]}
              />
            </ThemedView>

            {/* Content */}
            <ThemedView style={styles.section}>
              <ThemedText
                variant="body"
                size="lg"
                style={[styles.description, dynamicStyles.description]}
              >
                Welcome to Memory Game Pro - the ultimate brain training
                experience!
              </ThemedText>

              <ThemedText
                variant="body"
                size="base"
                style={[styles.bodyText, dynamicStyles.bodyText]}
              >
                Test and improve your memory skills with our challenging card
                matching game. Flip cards to find matching pairs and complete
                levels as quickly as possible.
              </ThemedText>

              <ThemedView style={styles.featureSection}>
                <ThemedText
                  variant="heading"
                  size="lg"
                  weight="semibold"
                  style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
                >
                  Features:
                </ThemedText>

                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  • Multiple difficulty levels
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  • Timer and scoring system
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  • Sound effects and animations
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  • Dark and light theme support
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.featureSection}>
                <ThemedText
                  variant="heading"
                  size="lg"
                  weight="semibold"
                  style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
                >
                  How to Play:
                </ThemedText>

                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  1. Choose your game duration
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  2. Tap "Start Game" to begin
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  3. Flip cards to find matching pairs
                </ThemedText>
                <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                  4. Complete all pairs to win!
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    minHeight: 80,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  featureSection: {
    marginBottom: 25,
  },
  title: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bodyText: {
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    opacity: 0.9,
  },
  sectionTitle: {
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  feature: {
    marginBottom: 8,
    paddingLeft: 10,
    opacity: 0.9,
    fontSize: 16,
  },
  headerDecoration: {
    width: 60,
    height: 4,
    opacity: 0.8,
    borderRadius: 2,
    marginTop: 8,
  },
});
