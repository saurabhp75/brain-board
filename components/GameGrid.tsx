import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useGameStore, type GameCell } from '@/stores/gameStore';
import ThemedView from './ThemedView';

const { width, height } = Dimensions.get('window');
const AVAILABLE_HEIGHT = Math.min(height * 0.35, 300); // Reduced from 40% to 35%
const AVAILABLE_WIDTH = width - 40;
const GRID_SIZE = Math.min(AVAILABLE_WIDTH, AVAILABLE_HEIGHT, 260); // Reduced max size
const GRID_PADDING = 12;
const CELL_GAP = 6;
const CELLS_PER_ROW = 3;

// Calculate the total space needed for 3 cells and 2 gaps
const TOTAL_CELL_SPACE = GRID_SIZE - GRID_PADDING * 2;
const TOTAL_GAP_SPACE = CELL_GAP * (CELLS_PER_ROW - 1);
const CELL_SIZE = (TOTAL_CELL_SPACE - TOTAL_GAP_SPACE) / CELLS_PER_ROW;

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

interface CellProps {
  cell: GameCell;
  index: number;
  gamePhase: string;
  handleCellClick: (id: number) => void;
}

function Cell({ cell, index, gamePhase, handleCellClick }: CellProps) {
  const isClickable = gamePhase === 'playing' && !cell.isCorrect;

  let cellContent = '?';
  let cellStyle: ViewStyle[] = [styles.cell];

  if (cell.isRevealed || cell.isCorrect) {
    cellContent = cell.value?.toString() || '?';
    cellStyle.push(styles.cellRevealed);
  }

  if (cell.showError) {
    cellContent = '✕';
    cellStyle.push(styles.cellError);
  }

  if (cell.isCorrect) {
    cellStyle.push(styles.cellCorrect);
  }

  // Calculate position for 3x3 grid with proper centering
  const row = Math.floor(index / CELLS_PER_ROW);
  const col = index % CELLS_PER_ROW;

  const cellPosition: ViewStyle = {
    position: 'absolute',
    left: GRID_PADDING + col * (CELL_SIZE + CELL_GAP),
    top: GRID_PADDING + row * (CELL_SIZE + CELL_GAP),
    width: CELL_SIZE,
    height: CELL_SIZE,
  };

  return (
    <TouchableOpacity
      style={[cellStyle, cellPosition]}
      onPress={() => handleCellClick(cell.id)}
      disabled={!isClickable}
      activeOpacity={0.7}
    >
      <Text
        style={
          [
            styles.cellText,
            cell.isCorrect && styles.cellTextCorrect,
            cell.showError && styles.cellTextError,
          ] as TextStyle[]
        }
      >
        {cellContent}
      </Text>
    </TouchableOpacity>
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
  cellContainer: {
    position: 'relative',
    borderRadius: 16,
    width: TOTAL_CELL_SPACE,
    height: TOTAL_CELL_SPACE,
  },
  cell: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cellRevealed: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    transform: [{ scale: 0.95 }],
  },
  cellCorrect: {
    backgroundColor: '#dcfce7',
    borderColor: '#10b981',
    transform: [{ scale: 1.05 }],
  },
  cellError: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
    transform: [{ scale: 0.9 }],
  },
  cellText: {
    fontSize: Math.min(CELL_SIZE * 0.4, 20),
    fontWeight: 'bold',
    color: '#475569',
  },
  cellTextCorrect: {
    color: '#059669',
  },
  cellTextError: {
    color: '#dc2626',
  },
});
