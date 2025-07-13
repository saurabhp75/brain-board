import { create } from 'zustand';
import { SoundService } from '@/services/soundService';

const SQUARES_IN_GRID = 9; // 3x3 grid

export interface GameCell {
  id: number; // Index
  value: number; // Number value (1-9) or 0(default) if empty
  isRevealed: boolean; // Show the cell value? default false
  showError: boolean; // if true show 'X' instead of value (default false)
}

export interface GameState {
  // Game state
  cells: GameCell[];
  currentTarget: number;
  gamePhase: 'setup' | 'memorizing' | 'playing' | 'victory';
  // TODO: Do we need this, as it is same as 'memorizing' phase?
  isLoading: boolean;
  statusMessage: string;

  // Settings
  duration: number;

  // Stats
  score: number;
  moves: number;
  bestTime: number | null;
  gamesPlayed: number;
  gamesWon: number;

  // Actions
  startGame: () => void;
  handleCellClick: (cellId: number) => void;
  setDuration: (duration: number) => void;
  resetGame: () => void;
  updateStats: (timeElapsed: number) => void;
}

const createEmptyGrid = (n: number = 9, show: boolean = false): GameCell[] => {
  const arr = Array.from({ length: n }, (_, index) => ({
    id: index,
    value: index + 1,
    isRevealed: show,
    showError: false,
  }));

  // Fisher-Yates shuffle algorithm
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i].value, arr[j].value] = [arr[j].value, arr[i].value];
  }

  return arr;
};

export const useGameStore = create<GameState>((set, get) => ({
  cells: createEmptyGrid(),
  currentTarget: 1,
  gamePhase: 'setup',
  isLoading: false,
  // TODO: statusMessage can be derived from gamePhase
  statusMessage: 'Set duration and press Start Game to begin',
  duration: 3000,
  score: 0,
  moves: 0,
  bestTime: null,
  gamesPlayed: 0,
  gamesWon: 0,

  startGame: () => {
    const { duration } = get();

    // Create grid with numbers showing for memorization phase
    const memoryCells = createEmptyGrid(SQUARES_IN_GRID, true);

    // Show the numbers for memorization phase
    set({
      cells: memoryCells,
      gamePhase: 'memorizing',
      statusMessage: `Memorize the positions! Time: ${duration / 1000}s`,
      isLoading: true,
    });

    // Hide numbers after duration, We don't need to clear timeout to
    // prevent memory leak (not needed as the timeout cannot be cleared,
    // since button is disabled)
    setTimeout(() => {
      const hiddenCells = memoryCells.map((cell) => ({
        ...cell,
        isRevealed: false, // Hide the number
      }));

      // Hide the numbers and start the game
      set({
        cells: hiddenCells,
        gamePhase: 'playing',
        statusMessage: 'Find number 1!',
        isLoading: false,
      });
    }, duration);
  },

  handleCellClick: (cellId: number) => {
    const { cells, currentTarget, gamePhase, moves } = get();

    if (gamePhase !== 'playing') return;

    const clickedCell = cells[cellId];
    if (clickedCell.isRevealed) return;

    const newMoves = moves + 1;

    if (clickedCell.value === currentTarget) {
      // Correct click - play success sound
      SoundService.playCorrectSound();

      // Update the cell to be revealed and marked as correct
      const newCells = cells.map((cell) =>
        cell.id === cellId ? { ...cell, isRevealed: true } : cell
      );

      const nextTarget = currentTarget + 1;

      if (nextTarget > 9) {
        // Victory! Play celebration sound
        SoundService.playVictorySound();

        set({
          cells: newCells,
          gamePhase: 'victory',
          statusMessage: 'You have won! 🎉',
          moves: newMoves,
          score: Math.max(0, 1000 - (newMoves - 9) * 10), // Bonus for fewer moves
        });
      } else {
        set({
          cells: newCells,
          currentTarget: nextTarget,
          statusMessage: `Find number ${nextTarget}!`,
          moves: newMoves,
        });
      }
    } else {
      // Wrong click - play error sound
      SoundService.playErrorSound();

      const newCells = cells.map((cell) =>
        cell.id === cellId ? { ...cell, showError: true } : cell
      );

      set({
        cells: newCells,
        statusMessage: 'Oh no! Try again.',
        moves: newMoves,
      });

      // Hide error after 500ms
      setTimeout(() => {
        const resetCells = get().cells.map((cell) =>
          cell.id === cellId ? { ...cell, showError: false } : cell
        );

        set({
          cells: resetCells,
          statusMessage: `Find number ${currentTarget}!`,
        });
      }, 500);
    }
  },

  setDuration: (duration: number) => {
    const clampedDuration = Math.max(1000, Math.min(10000, duration));
    set({ duration: clampedDuration });
  },

  resetGame: () => {
    set({
      cells: createEmptyGrid(),
      currentTarget: 1,
      gamePhase: 'setup',
      statusMessage: 'Set duration and press Start Game to begin',
      isLoading: false,
      moves: 0,
      score: 0,
    });
  },

  updateStats: (timeElapsed: number) => {
    const { bestTime, gamesPlayed, gamesWon } = get();

    set({
      bestTime:
        bestTime === null ? timeElapsed : Math.min(bestTime, timeElapsed),
      gamesPlayed: gamesPlayed + 1,
      gamesWon: gamesWon + 1,
    });
  },
}));
