import { StyleSheet } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import ThemedView from './ThemedView';
import { Cell } from './GameCell';
import { GRID_PADDING, GRID_SIZE } from '@/constants/layouts';

export default function GameGrid() {
  const { cells, gamePhase, handleCellClick } = useGameStore();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.grid}>
        {cells.map((cell, index) => (
          <Cell
            key={cell.id}
            cell={cell}
            gamePhase={gamePhase}
            handleCellClick={handleCellClick}
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: GRID_PADDING,
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
  },
});
