import { View, Text } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { useGameStore } from '@/stores/gameStore';
import { GAME_STATUS } from '@/stores/gameStore';

const GameStatus = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const moves = useGameStore((state) => state.moves);
  const currentTarget = useGameStore((state) => state.currentTarget);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  return (
    <View
      className="items-center mb-4 rounded-2xl p-4 border shadow-sm"
      style={{
        backgroundColor: currentColors.card,
        borderColor: currentColors.grey3,
      }}
    >
      {gamePhase === 'playing' ? (
        <View className="flex-row justify-around rounded-lg w-full gap-5">
          <View
            className="flex-row items-center justify-center rounded-lg p-3 flex-1 border gap-2"
            style={{
              backgroundColor: currentColors.grey6,
              borderColor: currentColors.grey4,
            }}
          >
            <Text
              className="text-sm font-bold uppercase"
              style={{ color: currentColors.foreground }}
            >
              Search For : {currentTarget}
              {'  '}Moves : {moves}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          className="text-lg font-bold text-center mb-3"
          style={{ color: currentColors.foreground }}
        >
          {GAME_STATUS[gamePhase] || 'Game Status'}
        </Text>
      )}
    </View>
  );
};

export default GameStatus;
