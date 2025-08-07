import { TouchableOpacity, View, Text } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { useGameStore } from '@/stores/gameStore';
import { Play, RotateCcw } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';

const GameButton = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  const isStartDisabled = gamePhase === 'memorizing';

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

  const getButtonVariant = () => {
    if (isStartDisabled) {
      return 'secondary';
    }
    return 'primary';
  };

  const getIconColor = () => {
    if (isStartDisabled) {
      return currentColors.grey2;
    }
    return COLORS.white;
  };

  return (
    <View className="flex-1">
      <TouchableOpacity
        className="rounded-lg gap-2 flex-row items-center justify-center py-4 px-6"
        style={{
          backgroundColor: isStartDisabled
            ? currentColors.grey4
            : currentColors.primary,
          borderWidth: 2,
          borderColor: isStartDisabled
            ? currentColors.grey3
            : currentColors.primary,
          opacity: isStartDisabled ? 0.7 : 1,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 3,
        }}
        onPress={handleStartGame}
        disabled={isStartDisabled}
      >
        {/* Show play icon in setup phase, reset icon in playing phase */}
        {gamePhase === 'setup' && (
          <Play color={getIconColor()} size={16} fill={getIconColor()} />
        )}
        {gamePhase === 'victory' && (
          <Play color={getIconColor()} size={16} fill={getIconColor()} />
        )}
        {gamePhase === 'playing' && (
          <RotateCcw color={getIconColor()} size={16} strokeWidth={3} />
        )}
        <Text
          style={{
            color: isStartDisabled ? currentColors.grey2 : COLORS.white,
            fontWeight: 'bold',
            fontSize: 16,
          }}
        >
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameButton;
