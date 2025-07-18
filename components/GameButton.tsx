import { StyleSheet, TouchableOpacity } from 'react-native';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import { useGameStore } from '@/stores/gameStore';
import { Play, RotateCcw } from 'lucide-react-native';

const GameButton = () => {
  const { gamePhase, startGame, resetGame } = useGameStore();

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

  const isStartDisabled = gamePhase === 'memorizing';

  return (
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
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 2,
    borderRadius: 12,
  },
  startButton: {
    backgroundColor: '#4f46e5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    height: 56,
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowColor: '#9ca3af',
    shadowOpacity: 0.2,
  },
  startButtonVictory: {
    backgroundColor: '#10b981',
    shadowColor: '#10b981',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default GameButton;
