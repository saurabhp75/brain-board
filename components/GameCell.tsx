import {
  CELL_GAP,
  CELL_SIZE,
  CELLS_PER_ROW,
  GRID_PADDING,
  TOTAL_CELL_SPACE,
} from '@/constants/layouts';
import { GameCell } from '@/stores/gameStore';
import {
  TouchableOpacity,
  ViewStyle,
  Text,
  TextStyle,
  StyleSheet,
} from 'react-native';

interface CellProps {
  cell: GameCell;
  gamePhase: string;
  handleCellClick: (id: number) => void;
}

export function Cell({ cell, gamePhase, handleCellClick }: CellProps) {
  const isClickable = gamePhase === 'playing' && !cell.isRevealed;

  let cellContent = '?';
  let cellStyle: ViewStyle[] = [styles.cell];

  if (cell.isRevealed) {
    cellContent = cell.value.toString();
    cellStyle.push(styles.cellRevealed);
  }

  if (cell.showError) {
    cellContent = 'X';
    cellStyle.push(styles.cellError);
  }

  // Calculate cell's row and column
  const row = Math.floor(cell.id / CELLS_PER_ROW);
  const col = cell.id % CELLS_PER_ROW;

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
            cell.isRevealed && styles.cellTextCorrect,
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
  cellContainer: {
    position: 'relative',
    borderRadius: 16,
    width: TOTAL_CELL_SPACE,
    height: TOTAL_CELL_SPACE,
  },
  cell: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(79, 70, 229, 0.2)',
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  cellRevealed: {
    backgroundColor: '#ede9fe',
    borderColor: '#8b5cf6',
    transform: [{ scale: 0.95 }],
    shadowColor: '#8b5cf6',
  },
  cellCorrect: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
    transform: [{ scale: 1.05 }],
    shadowColor: '#10b981',
  },
  cellError: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    transform: [{ scale: 0.9 }],
    shadowColor: '#ef4444',
  },
  cellText: {
    fontSize: Math.min(CELL_SIZE * 0.45, 24),
    fontWeight: '800',
    color: '#374151',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cellTextCorrect: {
    color: '#059669',
  },
  cellTextError: {
    color: '#dc2626',
  },
});
