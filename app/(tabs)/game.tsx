import * as React from 'react';
import { useEffect } from 'react';
import { StyleSheet, SafeAreaView, useColorScheme } from 'react-native';
import GameGrid from '@/components/GameGrid';
import GameStatus from '@/components/GameStatus';
import DurationInput from '@/components/DurationInput';
import GameButton from '@/components/GameButton';
import { useGameStore } from '@/stores/gameStore';
// import { useAuthStore } from '@/stores/authStore';
import { SoundService } from '@/services/soundService';
import { Confetti } from 'react-native-fast-confetti';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import {
  KeyboardProvider,
  KeyboardAvoidingView,
} from 'react-native-keyboard-controller';

export default function GameScreen() {
  const { gamePhase } = useGameStore();
  // const { user } = useAuthStore();
  // const [gameStartTime, setGameStartTime] = React.useState<number | null>(null);
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const dynamicStyles = StyleSheet.create({
    title: {
      color: theme.onBackground,
    },
    headerDecoration: {
      backgroundColor: theme.onBackground,
    },
    welcome: {
      color: theme.onBackgroundVariant,
    },
  });

  useEffect(() => {
    // Initialize sound service when component mounts
    const initializeSounds = async () => {
      await SoundService.initialize();
    };
    initializeSounds();

    // Cleanup when component unmounts
    return () => {
      SoundService.cleanup();
    };
  }, []);

  // useEffect(() => {
  //   if (gamePhase === 'playing' && gameStartTime === null) {
  //     setGameStartTime(Date.now());
  //   } else if (gamePhase === 'victory' && gameStartTime !== null) {
  //     const timeElapsed = Date.now() - gameStartTime;
  //     updateStats(timeElapsed);
  //     setGameStartTime(null);
  //   }
  // }, [gamePhase, gameStartTime, updateStats]);

  return (
    <KeyboardProvider>
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={100}
        style={styles.content}
      >
        <SafeAreaView style={styles.container}>
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
                style={[
                  styles.headerDecoration,
                  dynamicStyles.headerDecoration,
                ]}
              />
            </ThemedView>

            {/* Game Status - Above Grid */}
            <ThemedView style={styles.statusContainer}>
              <GameStatus />
            </ThemedView>

            {/* Game Grid */}
            <ThemedView style={styles.gridContainer}>
              <GameGrid />
            </ThemedView>

            {/* Bottom Controls - Fixed at bottom */}
            <ThemedView style={styles.bottomControlsContainer}>
              <DurationInput />
              <GameButton />
            </ThemedView>
          </ThemedView>

          {/* Confetti Animation */}
          {gamePhase === 'victory' && <Confetti />}
        </SafeAreaView>
      </KeyboardAvoidingView>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingBottom: 80,
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
    opacity: 0.8,
    borderRadius: 2,
    marginTop: 8,
  },
  title: {
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcome: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    minHeight: 200,
    marginBottom: 20,
  },
  bottomControlsContainer: {
    paddingHorizontal: 15,
    paddingBottom: 10,
    flexDirection: 'column',
    gap: 28,
    alignItems: 'stretch',
  },
});
