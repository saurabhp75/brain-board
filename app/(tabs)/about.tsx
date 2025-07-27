import { StyleSheet, ScrollView, useColorScheme } from 'react-native';
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
    <ThemedView style={styles.container}>
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
              🧠 Memory Game Pro
            </ThemedText>
            <ThemedView
              style={[styles.headerDecoration, dynamicStyles.headerDecoration]}
            />
          </ThemedView>

          {/* Content */}
          <ThemedView style={styles.section}>
            <ThemedText
              variant="body"
              size="lg"
              style={[styles.description, dynamicStyles.description]}
            >
              Welcome to Memory Game Pro - the ultimate brain challenge!
            </ThemedText>

            <ThemedText
              variant="body"
              size="base"
              style={[styles.bodyText, dynamicStyles.bodyText]}
            >
              Test and improve your memory skills with our fun and challenging
              game. Flip cards to find the numbers in sequence as quickly as
              possible.
            </ThemedText>

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
                1. Set your game time in milliseconds.
              </ThemedText>
              <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                2. Tap "Start Game" to begin.
              </ThemedText>
              <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                3. Tap the squares to find the next number starting from 1.
              </ThemedText>
              <ThemedText style={[styles.feature, dynamicStyles.feature]}>
                4. Repeat until all numbers are found in sequence.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
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
