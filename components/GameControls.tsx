import { useState } from 'react';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, RotateCcw } from 'lucide-react-native';
import { useGameStore } from '@/stores/gameStore';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';

export default function GameControls() {
  const {
    duration,
    gamePhase,
    statusMessage,
    moves,
    score,
    startGame,
    setDuration,
    resetGame,
  } = useGameStore();

  const [durationInput, setDurationInput] = useState(duration.toString());

  const handleDurationChange = (text: string) => {
    setDurationInput(text);
    const cleanedValue = text.replace(/[^0-9]/g, '');
    const numValue = parseInt(cleanedValue, 10);
    if (!isNaN(numValue)) {
      setDuration(numValue);
    } else {
      setDuration(3000); // Default value if input is invalid
    }
  };

  const handleStartGame = async () => {
    switch (gamePhase) {
      case 'setup':
        startGame();
        break;
      case 'playing':
        resetGame();
        break;
      case 'victory':
        resetGame();
        break;
      default:
        resetGame();
        break;
    }
  };

  const getButtonText = () => {
    switch (gamePhase) {
      case 'setup':
        return 'Start Game';
      case 'memorizing':
        return 'Memorizing...';
      case 'playing':
        return 'Reset Game';
      case 'victory':
        return 'Play Again';
      default:
        return 'Start Game';
    }
  };

  // const isStartDisabled = gamePhase === 'memorizing' || isLoading;
  const isStartDisabled = gamePhase === 'memorizing';

  return (
    <ThemedView>
      {/* Status Display */}
      <ThemedView style={styles.statusContainer}>
        <ThemedText>{statusMessage}</ThemedText>

        {gamePhase === 'playing' && (
          <ThemedView style={styles.statsContainer}>
            <ThemedText>Moves: {moves}</ThemedText>
            <ThemedText>Score: {score}</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* Duration Input */}
      <ThemedView style={styles.inputContainer}>
        <ThemedText>Duration (ms):</ThemedText>
        <TextInput
          style={styles.durationInput}
          value={durationInput}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          editable={gamePhase === 'setup'}
          selectTextOnFocus={gamePhase === 'setup'}
        />
      </ThemedView>

      {/* Control Buttons */}
      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            isStartDisabled && styles.startButtonDisabled,
            gamePhase === 'victory' && styles.startButtonVictory,
          ]}
          onPress={handleStartGame}
          disabled={isStartDisabled}
        >
          {/* Show play icon in setup phase, reset icon in playing phase */}
          {gamePhase === 'setup' && <Play color="#ffffff" size={16} />}
          {gamePhase === 'victory' && <Play color="#ffffff" size={16} />}
          {gamePhase === 'playing' && <RotateCcw color="#ffffff" size={16} />}
          <ThemedText style={styles.startButtonText}>
            {getButtonText()}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
    borderRadius: 8,
    padding: 10,
  },
  durationInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9fafb',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    borderRadius: 8,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 6,
  },
  startButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  startButtonVictory: {
    backgroundColor: '#059669',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
