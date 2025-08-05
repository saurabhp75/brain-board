import {
  CELL_GAP,
  CELL_SIZE,
  CELLS_PER_ROW,
  GRID_PADDING,
  TOTAL_CELL_SPACE,
} from '@/constants/layouts';
import { GameCell, useGameStore } from '@/stores/gameStore';
import { ViewStyle } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { Button } from '@/components/nativewindui/Button';
import { Text } from '@/components/nativewindui/Text';

interface CellProps {
  cell: GameCell;
}

export function Cell({ cell }: CellProps) {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const handleCellClick = useGameStore((state) => state.handleCellClick);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  const isClickable = gamePhase === 'playing' && !cell.isRevealed;

  let cellContent = '?';
  let scaleClass = '';

  if (cell.isRevealed) {
    cellContent = cell.value.toString();
    scaleClass = 'scale-95';
  }

  if (cell.showError) {
    cellContent = '✕';
    scaleClass = 'scale-90';
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

  const getBackgroundStyle = () => {
    if (cell.isRevealed) {
      return {
        backgroundColor: currentColors.grey5,
        borderColor: currentColors.primary,
      };
    }

    return {
      backgroundColor: currentColors.card,
      borderColor: currentColors.grey3,
    };
  };

  return (
    <Button
      variant="secondary"
      className={`rounded-2xl items-center justify-center border-2 shadow-lg ${scaleClass}`}
      style={[cellPosition, getBackgroundStyle()]}
      onPress={() => handleCellClick(cell.id)}
      disabled={!isClickable}
    >
      <Text
        className="font-black text-center"
        style={{
          color: getTextColor(),
          fontSize: Math.min(CELL_SIZE * 0.45, 24),
        }}
      >
        {cellContent}
      </Text>
    </Button>
  );
}
