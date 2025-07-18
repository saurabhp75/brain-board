import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameGrid from '@/components/GameGrid';
import GameStatus from '@/components/GameStatus';
import DurationInput from '@/components/DurationInput';
import GameButton from '@/components/GameButton';
import { useGameStore } from '@/stores/gameStore';
// import { useAuthStore } from '@/stores/authStore';
import { SoundService } from '@/services/soundService';
import { Confetti } from 'react-native-fast-confetti';
import ThemedView from '@/components/ThemedView';
import AdBanner from '@/components/AdBanner';
import ThemedText from '@/components/ThemedText';

export default function GameScreen() {
  const { gamePhase, updateStats } = useGameStore();
  // const { user } = useAuthStore();
  const [gameStartTime, setGameStartTime] = React.useState<number | null>(null);

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

  useEffect(() => {
    if (gamePhase === 'playing' && gameStartTime === null) {
      setGameStartTime(Date.now());
    } else if (gamePhase === 'victory' && gameStartTime !== null) {
      const timeElapsed = Date.now() - gameStartTime;
      updateStats(timeElapsed);
      setGameStartTime(null);
    }
  }, [gamePhase, gameStartTime, updateStats]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        >
          <ThemedView style={styles.content}>
            {/* Header */}
            <ThemedView style={styles.header}>
              <ThemedText style={styles.title}>🧠 Memory Game Pro</ThemedText>
              <ThemedView style={styles.headerDecoration} />
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
        </LinearGradient>
        <AdBanner />
      </SafeAreaView>
    </>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 2,
    marginTop: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  welcome: {
    fontSize: 14,
    color: '#6b7280',
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
