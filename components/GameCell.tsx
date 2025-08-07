import {
  CELL_GAP,
  CELL_SIZE,
  CELLS_PER_ROW,
  GRID_PADDING,
  TOTAL_CELL_SPACE,
} from '@/constants/layouts';
import { useColorScheme } from '@/lib/useColorScheme';
import { GameCell, useGameStore } from '@/stores/gameStore';
import { COLORS } from '@/theme/colors';
import { TouchableOpacity, ViewStyle, StyleSheet, Text } from 'react-native';

interface CellProps {
  cell: GameCell;
}

export function Cell({ cell }: CellProps) {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const handleCellClick = useGameStore((state) => state.handleCellClick);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  const dynamicStyles = StyleSheet.create({
    cellText: {
      textShadowColor: currentColors.background,
    },
  });

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
    if (cell.showError) return currentColors.destructive;
    if (cell.isRevealed) return currentColors.primary;
    return currentColors.foreground;
  };

  return (
    <TouchableOpacity
      style={[
        cellStyle,
        cellPosition,
        {
          backgroundColor: cell.isRevealed
            ? currentColors.background
            : currentColors.card,
          borderColor: cell.isRevealed
            ? currentColors.foreground
            : currentColors.background,
          shadowColor: currentColors.background,
        },
      ]}
      onPress={() => handleCellClick(cell.id)}
      disabled={!isClickable}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.cellText,
          dynamicStyles.cellText,
          {
            color: getTextColor(),
            fontSize: Math.min(CELL_SIZE * 0.45, 24),
          },
        ]}
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
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
