import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameGrid from '@/components/GameGrid';
import GameControls from '@/components/GameControls';
import ConfettiCelebration from '@/components/ConfettiCelebration';
import { useGameStore } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';
import { SoundService } from '@/services/soundService';

Dimensions.get('window');

export default function GameScreen() {
  const { gamePhase, updateStats } = useGameStore();
  const { user } = useAuthStore();
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
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Memory Game Pro</Text>
            {user && <Text style={styles.welcome}>Welcome, {user.name}!</Text>}
          </View>

          {/* Game Controls */}
          <View style={styles.controlsContainer}>
            <GameControls />
          </View>

          {/* Game Grid */}
          <View style={styles.gridContainer}>
            <GameGrid />
          </View>

          {/* Bottom Spacer */}
          <View style={styles.bottomSpacer} />
        </View>

        {/* Confetti Animation */}
        <ConfettiCelebration show={gamePhase === 'victory'} />
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
  content: {
    flex: 1,
    paddingBottom: 10,
  },
  header: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 20,
    minHeight: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 2,
  },
  welcome: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  controlsContainer: {
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    minHeight: 200,
  },
  bottomSpacer: {
    height: 20,
  },
});
