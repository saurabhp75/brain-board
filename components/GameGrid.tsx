import { View } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { useGameStore } from '@/stores/gameStore';
import { Cell } from './GameCell';
import { GRID_PADDING, GRID_SIZE } from '@/constants/layouts';

export default function GameGrid() {
  const cells = useGameStore((state) => state.cells);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  return (
    <View className="items-center justify-center">
      <View
        className="rounded-2xl border-2 items-center justify-center shadow-xl"
        style={{
          width: GRID_SIZE,
          height: GRID_SIZE,
          padding: GRID_PADDING,
          backgroundColor: currentColors.grey5,
          borderColor: currentColors.grey3,
        }}
      >
        {cells.map((cell) => (
          <Cell key={cell.id} cell={cell} />
        ))}
      </View>
    </View>
  );
}
