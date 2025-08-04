import { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, useColorScheme } from 'react-native';
import GameGrid from '@/mycomponents/GameGrid';
import GameStatus from '@/mycomponents/GameStatus';
import DurationInput from '@/mycomponents/DurationInput';
import GameButton from '@/mycomponents/GameButton';
import { useGameStore } from '@/stores/gameStore';
// import { useAuthStore } from '@/stores/authStore';
import { SoundService } from '@/services/soundService';
import { Confetti } from 'react-native-fast-confetti';
import ThemedView from '@/mycomponents/ThemedView';
import ThemedText from '@/mycomponents/ThemedText';
import { Colors } from '@/constants/Colors';
// import {
//   KeyboardProvider,
//   KeyboardAvoidingView,
// } from 'react-native-keyboard-controller';

export default function GameScreen() {
  const gamePhase = useGameStore((state) => state.gamePhase);
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
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={process.env.EXPO_OS === 'ios' ? 10 : 0}
    >
      <ThemedView style={styles.container}>
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
          <ThemedText
            weight="bold"
            disabled={gamePhase !== 'setup'}
            style={styles.timeLabel}
          >
            Time (ms):
          </ThemedText>
          <DurationInput />
          <GameButton />
        </ThemedView>

        {/* Confetti Animation */}
        {gamePhase === 'victory' && <Confetti />}
      </ThemedView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
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
  statusContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
    minHeight: 60, // Ensure minimum height for visibility
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    minHeight: 200,
  },
  bottomControlsContainer: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 100, // Space for tab bar
    flexDirection: 'column',
    gap: 15,
    alignItems: 'stretch',
  },
  timeLabel: {
    textAlign: 'center',
    marginBottom: 5,
  },
});
