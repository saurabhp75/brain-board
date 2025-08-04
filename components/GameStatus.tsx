import { View, useColorScheme, Text } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import { GAME_STATUS } from '@/stores/gameStore';

const GameStatus = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const moves = useGameStore((state) => state.moves);
  const currentTarget = useGameStore((state) => state.currentTarget);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={`items-center mb-4 rounded-2xl p-4 border shadow-sm ${
        isDark ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'
      }`}
    >
      {gamePhase === 'playing' ? (
        <View className="flex-row justify-around rounded-lg w-full gap-5">
          <View
            className={`flex-row items-center justify-center rounded-lg p-3 flex-1 border gap-2 ${
              isDark
                ? 'bg-gray-900 border-gray-700'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-bold uppercase ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              Search For : {currentTarget}
              {'  '}Moves : {moves}
            </Text>
          </View>
        </View>
      ) : (
        <Text
          className={`text-lg font-bold text-center mb-3 ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {GAME_STATUS[gamePhase] || 'Game Status'}
        </Text>
      )}
    </View>
  );
};

export default GameStatus;
