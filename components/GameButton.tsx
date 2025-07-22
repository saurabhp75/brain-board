import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import { useGameStore } from '@/stores/gameStore';
import { Play, RotateCcw } from 'lucide-react-native';
import { Colors } from '@/constants/Colors';

const GameButton = () => {
  const { gamePhase, startGame, resetGame } = useGameStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const dynamicStyles = StyleSheet.create({
    startButtonText: {
      color: theme.onBackground,
    },
  });

  const getIconColor = () => {
    return theme.onBackground;
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

  const isStartDisabled = gamePhase === 'memorizing';

  const getButtonColor = () => {
    if (isStartDisabled) return theme.surfaceContainerLow;
    if (gamePhase === 'victory') return theme.success;
    return theme.primary;
  };

  const getButtonPressedColor = () => {
    if (isStartDisabled) return theme.surfaceContainerLow;
    if (gamePhase === 'victory') return theme.successFixed;
    return theme.primaryContainer;
  };

  return (
    <ThemedView style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.startButton,
          {
            backgroundColor: getButtonColor(),
            shadowColor: getButtonColor(),
          },
        ]}
        onPress={handleStartGame}
        disabled={isStartDisabled}
        activeOpacity={0.8}
      >
        {/* Show play icon in setup phase, reset icon in playing phase */}
        {gamePhase === 'setup' && <Play color={getIconColor()} size={16} />}
        {gamePhase === 'victory' && <Play color={getIconColor()} size={16} />}
        {gamePhase === 'playing' && (
          <RotateCcw color={getIconColor()} size={16} />
        )}
        <ThemedText
          variant="heading"
          size="base"
          weight="semibold"
          style={[styles.startButtonText, dynamicStyles.startButtonText]}
        >
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    height: 56,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  startButtonText: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default GameButton;
