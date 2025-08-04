import {
  CELL_GAP,
  CELL_SIZE,
  CELLS_PER_ROW,
  GRID_PADDING,
  TOTAL_CELL_SPACE,
} from '@/constants/layouts';
import { GameCell, useGameStore } from '@/stores/gameStore';
import {
  TouchableOpacity,
  ViewStyle,
  useColorScheme,
  Text,
} from 'react-native';
import { COLORS } from '@/theme/colors';

interface CellProps {
  cell: GameCell;
}

export function Cell({ cell }: CellProps) {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const handleCellClick = useGameStore((state) => state.handleCellClick);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
    if (cell.showError) return isDark ? '#ef4444' : '#dc2626'; // red
    if (cell.isRevealed) return isDark ? '#3b82f6' : '#2563eb'; // blue
    return isDark ? '#ffffff' : '#000000'; // default
  };

  const getBackgroundClasses = () => {
    const baseClasses = `rounded-2xl items-center justify-center border-2 shadow-lg ${scaleClass}`;

    if (cell.isRevealed) {
      return `${baseClasses} ${
        isDark ? 'bg-gray-800 border-blue-500' : 'bg-gray-100 border-blue-400'
      }`;
    }

    return `${baseClasses} ${
      isDark ? 'bg-gray-900 border-gray-600' : 'bg-white border-gray-300'
    }`;
  };

  return (
    <TouchableOpacity
      className={getBackgroundClasses()}
      style={cellPosition}
      onPress={() => handleCellClick(cell.id)}
      disabled={!isClickable}
      activeOpacity={0.7}
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
    </TouchableOpacity>
  );
}
