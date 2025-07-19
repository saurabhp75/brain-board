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
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Fonts } from '@/constants/Fonts';
import ThemedText from './ThemedText';

interface CellProps {
  cell: GameCell;
  gamePhase: string;
  handleCellClick: (id: number) => void;
}

export function Cell({ cell, gamePhase, handleCellClick }: CellProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const isClickable = gamePhase === 'playing' && !cell.isRevealed;

  let cellContent = '?';
  let cellStyle: ViewStyle[] = [styles.cell];

  if (cell.isRevealed) {
    cellContent = cell.value.toString();
    cellStyle.push(styles.cellRevealed);
  }

  if (cell.showError) {
    cellContent = '✕';
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

  const getTextColor = () => {
    if (cell.showError) return theme.error;
    if (cell.isRevealed) return theme.info;
    return theme.onSurface;
  };

  return (
    <TouchableOpacity
      style={[
        cellStyle,
        cellPosition,
        {
          backgroundColor: cell.isRevealed
            ? theme.surfaceContainerHighest
            : theme.surface,
          borderColor: cell.isRevealed ? theme.outlineFocus : theme.outline,
          shadowColor: theme.shadow,
        },
      ]}
      onPress={() => handleCellClick(cell.id)}
      disabled={!isClickable}
      activeOpacity={0.7}
    >
      <ThemedText
        variant="numbers"
        weight="extrabold"
        style={[
          styles.cellText,
          {
            color: getTextColor(),
            fontSize: Math.min(CELL_SIZE * 0.45, 24),
          },
        ]}
      >
        {cellContent}
      </ThemedText>
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
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  cellRevealed: {
    transform: [{ scale: 0.95 }],
  },
  cellCorrect: {
    transform: [{ scale: 1.05 }],
  },
  cellError: {
    transform: [{ scale: 0.9 }],
  },
  cellText: {
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
