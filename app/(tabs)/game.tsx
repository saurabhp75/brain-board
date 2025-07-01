import React, { useEffect } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import GameGrid from '@/components/GameGrid';
import GameControls from '@/components/GameControls';
import { useGameStore } from '@/stores/gameStore';
import { useAuthStore } from '@/stores/authStore';

export default function GameScreen() {
  const { gamePhase, updateStats } = useGameStore();
  const { user } = useAuthStore();
  const [gameStartTime, setGameStartTime] = React.useState<number | null>(null);

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
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Memory Game Pro</Text>
            {user && <Text style={styles.welcome}>Welcome, {user.name}!</Text>}
          </View>

          {/* Game Controls */}
          <GameControls />

          {/* Game Grid */}
          <GameGrid />
        
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
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  instructionsContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
});