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
  index: number;
  gamePhase: string;
  handleCellClick: (id: number) => void;
}

export function Cell({ cell, index, gamePhase, handleCellClick }: CellProps) {
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
