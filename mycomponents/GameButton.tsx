import { TouchableOpacity, useColorScheme, View, Text } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import { Play, RotateCcw } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';

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

  const getButtonClasses = () => {
    if (isStartDisabled) {
      return isDark ? 'bg-gray-700' : 'bg-gray-300';
    }
    if (gamePhase === 'victory') {
      return 'bg-green-500';
    }
    return isDark ? 'bg-blue-600' : 'bg-blue-500';
  };

  return (
    <View className="flex-[2] rounded-xl">
      <TouchableOpacity
        className={`flex-row items-center justify-center p-3.5 rounded-xl gap-2 h-14 shadow-lg ${getButtonClasses()}`}
        onPress={handleStartGame}
        disabled={isStartDisabled}
        activeOpacity={0.8}
      >
        {/* Show play icon in setup phase, reset icon in playing phase */}
        {gamePhase === 'setup' && (
          <Play color="#ffffff" size={16} fill="#ffffff" />
        )}
        {gamePhase === 'victory' && (
          <Play color="#ffffff" size={16} fill="#ffffff" />
        )}
        {gamePhase === 'playing' && (
          <RotateCcw color="#ffffff" size={16} strokeWidth={3} />
        )}
        <Text className="text-base font-semibold text-white">
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameButton;
