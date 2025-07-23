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
import ThemedSwitch from '@/components/ThemedSwitch';
import { Colors } from '@/constants/Colors';
import { SoundService } from '@/services/soundService';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Initialize state from SoundService
  const [soundEnabled, setSoundEnabled] = React.useState(
    SoundService.isSoundServiceEnabled()
  );
  const [hapticsEnabled, setHapticsEnabled] = React.useState(
    SoundService.isHapticServiceEnabled()
  );

  // Handle sound toggle
  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
    SoundService.setSoundEnabled(value);
  };

  // Handle haptics toggle
  const handleHapticsToggle = (value: boolean) => {
    setHapticsEnabled(value);
    SoundService.setHapticsEnabled(value);
  };

  const dynamicStyles = StyleSheet.create({
    title: {
      color: theme.onBackground,
    },
    sectionTitle: {
      color: theme.onBackground,
    },
    description: {
      color: theme.onSurfaceVariant,
    },
    settingItem: {
      backgroundColor: theme.surfaceContainerHigh,
      borderColor: theme.outline,
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
                ⚙️ Settings
              </ThemedText>
              <ThemedView
                style={[
                  styles.headerDecoration,
                  dynamicStyles.headerDecoration,
                ]}
              />
            </ThemedView>

            {/* Settings Section */}
            <ThemedView style={styles.section}>
              <ThemedText
                variant="heading"
                size="lg"
                weight="bold"
                style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
              >
                Audio & Feedback
              </ThemedText>

              {/* Sound Toggle */}
              <ThemedView
                style={[styles.settingItem, dynamicStyles.settingItem]}
              >
                <ThemedView style={styles.settingContent}>
                  <ThemedView style={styles.settingTextContainer}>
                    <ThemedText
                      variant="body"
                      size="base"
                      weight="semibold"
                      style={[styles.settingTitle, dynamicStyles.sectionTitle]}
                    >
                      Sound Effects
                    </ThemedText>
                    <ThemedText
                      variant="body"
                      size="sm"
                      style={[
                        styles.settingDescription,
                        dynamicStyles.description,
                      ]}
                    >
                      Play sounds for game actions and feedback
                    </ThemedText>
                  </ThemedView>
                  <ThemedSwitch
                    value={soundEnabled}
                    onValueChange={handleSoundToggle}
                  />
                </ThemedView>
              </ThemedView>

              {/* Haptics Toggle */}
              <ThemedView
                style={[styles.settingItem, dynamicStyles.settingItem]}
              >
                <ThemedView style={styles.settingContent}>
                  <ThemedView style={styles.settingTextContainer}>
                    <ThemedText
                      variant="body"
                      size="base"
                      weight="semibold"
                      style={[styles.settingTitle, dynamicStyles.sectionTitle]}
                    >
                      Haptic Feedback
                    </ThemedText>
                    <ThemedText
                      variant="body"
                      size="sm"
                      style={[
                        styles.settingDescription,
                        dynamicStyles.description,
                      ]}
                    >
                      Vibrate on touch and game interactions
                    </ThemedText>
                  </ThemedView>
                  <ThemedSwitch
                    value={hapticsEnabled}
                    onValueChange={handleHapticsToggle}
                  />
                </ThemedView>
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
  title: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  sectionTitle: {
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  settingItem: {
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    marginBottom: 4,
  },
  settingDescription: {
    opacity: 0.8,
    lineHeight: 18,
  },
  headerDecoration: {
    width: 60,
    height: 4,
    opacity: 0.8,
    borderRadius: 2,
    marginTop: 8,
  },
});
