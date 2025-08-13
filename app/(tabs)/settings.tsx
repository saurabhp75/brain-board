import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import ThemedSwitch from '@/components/ThemedSwitch';
import { Colors } from '@/constants/Colors';
import { SoundService } from '@/services/soundService';
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';
import UsernameDialog from '@/components/UsernameDialog';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  // Initialize state from SoundService
  const [soundEnabled, setSoundEnabled] = useState(
    SoundService.isSoundServiceEnabled()
  );
  const [hapticsEnabled, setHapticsEnabled] = useState(
    SoundService.isHapticServiceEnabled()
  );
  const userName = useGameStore((s) => s.userName);
  const setUserName = useGameStore((s) => s.setUserName);
  const adsRemoved = useGameStore((s) => s.adsRemoved);
  const setAdsRemoved = useGameStore((s) => s.setAdsRemoved);
  const [showNameDialog, setShowNameDialog] = useState(false);

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
              ⚙️ Settings
            </ThemedText>
            <ThemedView
              style={[styles.headerDecoration, dynamicStyles.headerDecoration]}
            />
          </ThemedView>

          {/* Settings Section */}
          <ThemedView style={styles.section}>
            {/* User Profile Section */}
            <ThemedText
              variant="heading"
              size="lg"
              weight="bold"
              style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
            >
              Player
            </ThemedText>
            <ThemedView style={[styles.settingItem, dynamicStyles.settingItem]}>
              <ThemedView style={styles.settingContent}>
                <ThemedView style={styles.settingTextContainer}>
                  <ThemedText
                    variant="body"
                    size="base"
                    weight="semibold"
                    style={[styles.settingTitle, dynamicStyles.sectionTitle]}
                  >
                    Username
                  </ThemedText>
                  <ThemedText
                    variant="body"
                    size="sm"
                    style={[
                      styles.settingDescription,
                      dynamicStyles.description,
                    ]}
                  >
                    {userName ? `${userName}` : 'No name set'}
                  </ThemedText>
                </ThemedView>
                <TouchableOpacity
                  onPress={() => setShowNameDialog(true)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    backgroundColor: theme.primary,
                    borderWidth: 1,
                    borderColor: theme.primaryContainer,
                  }}
                  activeOpacity={0.85}
                >
                  <ThemedText
                    variant="body"
                    size="sm"
                    weight="bold"
                    style={{ color: '#ffffff' }}
                  >
                    Change
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>

            <ThemedText
              variant="heading"
              size="lg"
              weight="bold"
              style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
            >
              Audio & Feedback
            </ThemedText>

            {/* Sound Toggle */}
            <ThemedView style={[styles.settingItem, dynamicStyles.settingItem]}>
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
                    Play sounds in game.
                  </ThemedText>
                </ThemedView>
                <ThemedSwitch
                  value={soundEnabled}
                  onValueChange={handleSoundToggle}
                />
              </ThemedView>
            </ThemedView>

            {/* Haptics Toggle */}
            <ThemedView style={[styles.settingItem, dynamicStyles.settingItem]}>
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
                    Vibrate on game interactions
                  </ThemedText>
                </ThemedView>
                <ThemedSwitch
                  value={hapticsEnabled}
                  onValueChange={handleHapticsToggle}
                />
              </ThemedView>
            </ThemedView>

            <ThemedText
              variant="heading"
              size="lg"
              weight="bold"
              style={[styles.sectionTitle, dynamicStyles.sectionTitle]}
            >
              Google Ads
            </ThemedText>
            <ThemedView style={[styles.settingItem, dynamicStyles.settingItem]}>
              <ThemedView style={styles.settingContent}>
                <ThemedView style={styles.settingTextContainer}>
                  <ThemedText
                    variant="body"
                    size="base"
                    weight="semibold"
                    style={[styles.settingTitle, dynamicStyles.sectionTitle]}
                  >
                    Banner Ads
                  </ThemedText>
                  <ThemedText
                    variant="body"
                    size="sm"
                    style={[
                      styles.settingDescription,
                      dynamicStyles.description,
                    ]}
                  >
                    {adsRemoved
                      ? 'Ads are hidden.'
                      : 'A small banner shows below the tabs.'}
                  </ThemedText>
                </ThemedView>
                <TouchableOpacity
                  onPress={() => setAdsRemoved(!adsRemoved)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 14,
                    borderRadius: 10,
                    backgroundColor: adsRemoved ? 'transparent' : theme.primary,
                    borderWidth: 1,
                    borderColor: adsRemoved
                      ? theme.outline
                      : theme.primaryContainer,
                  }}
                  activeOpacity={0.85}
                >
                  <ThemedText
                    variant="body"
                    size="sm"
                    weight="bold"
                    style={{
                      color: adsRemoved ? theme.onBackground : '#ffffff',
                    }}
                  >
                    {adsRemoved ? 'Enable Ads' : 'Remove Ads'}
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
        <UsernameDialog
          visible={showNameDialog}
          initialValue={userName}
          onSubmit={(name) => {
            setUserName(name);
            setShowNameDialog(false);
          }}
        />
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
