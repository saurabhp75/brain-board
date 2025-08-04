import { StyleSheet, useColorScheme } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import ThemedView from './ThemedView';
import { Cell } from './GameCell';
import { GRID_PADDING, GRID_SIZE } from '@/constants/layouts';
import { Colors } from '@/constants/Colors';

export default function GameGrid() {
  const cells = useGameStore((state) => state.cells);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.grid,
          {
            backgroundColor: theme.surfaceVariant,
            borderColor: theme.outlineVariant,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderRadius: 20,
    padding: GRID_PADDING,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});
