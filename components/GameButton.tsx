import { useColorScheme, View } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import { Play, RotateCcw } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';
import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';

const GameButton = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const startGame = useGameStore((state) => state.startGame);
  const resetGame = useGameStore((state) => state.resetGame);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    if (gamePhase === 'victory') {
      return 'tonal';
    }
    return 'primary';
  };

  const getButtonClasses = () => {
    if (isStartDisabled) {
      return 'opacity-50';
    }
    if (gamePhase === 'victory') {
      return 'bg-green-500';
    }
    return '';
  };

  const getIconColor = () => {
    if (isStartDisabled) {
      return isDark ? COLORS.dark.grey2 : COLORS.light.grey2;
    }
    if (gamePhase === 'victory') {
      return isDark ? COLORS.white : COLORS.black;
    }
    return COLORS.white;
  };

  return (
    <View className="flex-[2]">
      <Button
        variant={getButtonVariant()}
        size="lg"
        className={`h-14 ${getButtonClasses()}`}
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
        <Text>{getButtonText()}</Text>
      </Button>
    </View>
  );
};

export default GameButton;
