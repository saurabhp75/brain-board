import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { useGameStore, type GameCell } from '@/stores/gameStore';

const { width } = Dimensions.get('window');
const GRID_SIZE = Math.min(width - 40, 300);
const GRID_PADDING = 16;
const CELL_GAP = 8;
const CELLS_PER_ROW = 3;

// Calculate the total space needed for 3 cells and 2 gaps
const TOTAL_CELL_SPACE = GRID_SIZE - (GRID_PADDING * 2);
const TOTAL_GAP_SPACE = CELL_GAP * (CELLS_PER_ROW - 1);
const CELL_SIZE = (TOTAL_CELL_SPACE - TOTAL_GAP_SPACE) / CELLS_PER_ROW;

export default function GameGrid() {
  const { cells, gamePhase, handleCellClick } = useGameStore();

  const renderCell = (cell: GameCell, index: number) => {
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
      left: col * (CELL_SIZE + CELL_GAP),
      top: row * (CELL_SIZE + CELL_GAP),
      width: CELL_SIZE,
      height: CELL_SIZE,
    };

    return (
      <TouchableOpacity
        key={cell.id}
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <View style={styles.cellContainer}>
          {cells.map((cell, index) => renderCell(cell, index))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    fontSize: Math.min(CELL_SIZE * 0.4, 24),
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