import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const AVAILABLE_HEIGHT = Math.min(height * 0.35, 300); // Reduced from 40% to 35%
const AVAILABLE_WIDTH = width - 40;
export const GRID_SIZE = Math.min(AVAILABLE_WIDTH, AVAILABLE_HEIGHT, 260); // Reduced max size
export const GRID_PADDING = 12;
export const CELL_GAP = 6;
export const CELLS_PER_ROW = 3;

// Calculate the total space needed for 3 cells and 2 gaps
export const TOTAL_CELL_SPACE = GRID_SIZE - GRID_PADDING * 2;
const TOTAL_GAP_SPACE = CELL_GAP * (CELLS_PER_ROW - 1);
export const CELL_SIZE = (TOTAL_CELL_SPACE - TOTAL_GAP_SPACE) / CELLS_PER_ROW;
export const SQUARES_IN_GRID = 9; // 3x3 grid
