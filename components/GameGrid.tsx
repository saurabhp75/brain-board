import { useColorScheme, View } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import { Cell } from './GameCell';
import { GRID_PADDING, GRID_SIZE } from '@/constants/layouts';

export default function GameGrid() {
  const cells = useGameStore((state) => state.cells);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View className="items-center justify-center">
      <View
        className={`rounded-2xl border-2 items-center justify-center shadow-xl ${
          isDark ? 'bg-gray-800 border-gray-600' : 'bg-gray-200 border-gray-400'
        }`}
        style={{
          width: GRID_SIZE,
          height: GRID_SIZE,
          padding: GRID_PADDING,
        }}
      >
        {cells.map((cell) => (
          <Cell key={cell.id} cell={cell} />
        ))}
      </View>
    </View>
  );
}
