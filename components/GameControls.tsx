import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Play, RotateCcw } from 'lucide-react-native';
import { useGameStore } from '@/stores/gameStore';

export default function GameControls() {
  const {
    duration,
    gamePhase,
    statusMessage,
    isLoading,
    moves,
    score,
    initializeGame,
    startGame,
    setDuration,
    resetGame,
  } = useGameStore();

  const [durationInput, setDurationInput] = useState(duration.toString());

  const handleDurationChange = (text: string) => {
    setDurationInput(text);
    const numValue = parseInt(text, 10);
    if (!isNaN(numValue)) {
      setDuration(numValue);
    }
  };

  const handleStartGame = () => {
    if (gamePhase === 'setup') {
      initializeGame();
      setTimeout(() => startGame(), 100);
    } else if (gamePhase === 'victory') {
      resetGame();
    } else {
      startGame();
    }
  };

  const handleReset = () => {
    resetGame();
  };

  const getButtonText = () => {
    switch (gamePhase) {
      case 'setup':
        return 'Start Game';
      case 'memorizing':
        return 'Memorizing...';
      case 'playing':
        return 'Playing...';
      case 'victory':
        return 'Play Again';
      default:
        return 'Start Game';
    }
  };

  const isStartDisabled = gamePhase === 'memorizing' || isLoading;

  return (
    <View style={styles.container}>
      {/* Status Display */}
      <View style={styles.statusContainer}>
        <Text style={[
          styles.statusText,
          gamePhase === 'victory' && styles.statusTextVictory
        ]}>
          {statusMessage}
        </Text>
        
        {gamePhase === 'playing' && (
          <View style={styles.statsContainer}>
            <Text style={styles.statText}>Moves: {moves}</Text>
            <Text style={styles.statText}>Score: {score}</Text>
          </View>
        )}
      </View>

      {/* Duration Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Memorization Duration (ms):</Text>
        <TextInput
          style={styles.durationInput}
          value={durationInput}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          editable={gamePhase === 'setup'}
        />
        <Text style={styles.inputHint}>Range: 1000-10000ms</Text>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            isStartDisabled && styles.startButtonDisabled,
            gamePhase === 'victory' && styles.startButtonVictory,
          ]}
          onPress={handleStartGame}
          disabled={isStartDisabled}
        >
          <Play color="#ffffff" size={20} />
          <Text style={styles.startButtonText}>
            {getButtonText()}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
        >
          <RotateCcw color="#6b7280" size={20} />
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statusContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusTextVictory: {
    color: '#059669',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#f9fafb',
  },
  inputHint: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    gap: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  startButtonVictory: {
    backgroundColor: '#059669',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 8,
    gap: 8,
    minWidth: 80,
  },
  resetButtonText: {
    color: '#6b7280',
    fontSize: 14,
    fontWeight: '500',
  },
});