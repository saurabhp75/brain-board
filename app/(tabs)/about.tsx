import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';

export default function AboutScreen() {
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
                style={styles.title}
              >
                🧠 About Memory Game Pro
              </ThemedText>
              <ThemedView style={styles.headerDecoration} />
            </ThemedView>

            {/* Content */}
            <ThemedView style={styles.section}>
              <ThemedText variant="body" size="lg" style={styles.description}>
                Welcome to Memory Game Pro - the ultimate brain training
                experience!
              </ThemedText>

              <ThemedText variant="body" size="base" style={styles.bodyText}>
                Test and improve your memory skills with our challenging card
                matching game. Flip cards to find matching pairs and complete
                levels as quickly as possible.
              </ThemedText>

              <ThemedView style={styles.featureSection}>
                <ThemedText
                  variant="heading"
                  size="lg"
                  weight="semibold"
                  style={styles.sectionTitle}
                >
                  Features:
                </ThemedText>

                <ThemedText style={styles.feature}>
                  • Multiple difficulty levels
                </ThemedText>
                <ThemedText style={styles.feature}>
                  • Timer and scoring system
                </ThemedText>
                <ThemedText style={styles.feature}>
                  • Sound effects and animations
                </ThemedText>
                <ThemedText style={styles.feature}>
                  • Dark and light theme support
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.featureSection}>
                <ThemedText
                  variant="heading"
                  size="lg"
                  weight="semibold"
                  style={styles.sectionTitle}
                >
                  How to Play:
                </ThemedText>

                <ThemedText style={styles.feature}>
                  1. Choose your game duration
                </ThemedText>
                <ThemedText style={styles.feature}>
                  2. Tap "Start Game" to begin
                </ThemedText>
                <ThemedText style={styles.feature}>
                  3. Flip cards to find matching pairs
                </ThemedText>
                <ThemedText style={styles.feature}>
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
  headerDecoration: {
    width: 60,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
    marginTop: 8,
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  description: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bodyText: {
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
    opacity: 0.9,
  },
  featureSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#ffffff',
    marginBottom: 12,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  feature: {
    color: '#ffffff',
    marginBottom: 8,
    paddingLeft: 10,
    opacity: 0.9,
    fontSize: 16,
  },
});
