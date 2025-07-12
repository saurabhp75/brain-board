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
            index={index}
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
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: GRID_PADDING,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
