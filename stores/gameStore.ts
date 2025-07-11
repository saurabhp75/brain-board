import { create } from 'zustand';
import { SoundService } from '@/services/soundService';

export interface GameCell {
  id: number;
  value: number | null;
  isRevealed: boolean;
  isCorrect: boolean;
  showError: boolean;
}

export interface GameState {
  // Game state
  cells: GameCell[];
  currentTarget: number;
  gamePhase: 'setup' | 'memorizing' | 'playing' | 'victory';
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
  initializeGame: () => Promise<void>;
  startGame: () => void;
  handleCellClick: (cellId: number) => Promise<void>;
  setDuration: (duration: number) => void;
  resetGame: () => void;
  updateStats: (timeElapsed: number) => void;
}

const createEmptyGrid = (): GameCell[] => {
  return Array.from({ length: 9 }, (_, index) => ({
    id: index,
    value: null,
    isRevealed: false,
    isCorrect: false,
    showError: false,
  }));
};

const getRandomPositions = (count: number, max: number): number[] => {
  const positions = new Set<number>();
  while (positions.size < count) {
    positions.add(Math.floor(Math.random() * max));
  }
  return Array.from(positions);
};

export const useGameStore = create<GameState>((set, get) => ({
  // Initial state
  cells: createEmptyGrid(),
  currentTarget: 1,
  gamePhase: 'setup',
  isLoading: false,
  // statusMessage can be derived from gamePhase
  statusMessage: 'Set duration and press Start Game to begin',
  duration: 3000,
  score: 0,
  moves: 0,
  bestTime: null,
  gamesPlayed: 0,
  gamesWon: 0,

  initializeGame: async () => {
    // Initialize sound service
    // await SoundService.initialize();

    const cells = createEmptyGrid();
    const positions = getRandomPositions(9, 9);

    // Place numbers 1-9 in random positions
    positions.forEach((position, index) => {
      cells[position].value = index + 1;
    });

    set({
      cells,
      currentTarget: 1,
      gamePhase: 'setup',
      statusMessage: 'Numbers placed! Press Start Game to begin memorizing',
      moves: 0,
      score: 0,
    });
  },

  startGame: () => {
    const { cells, duration } = get();

    // Show all numbers during memorization phase
    const memoryCells = cells.map((cell) => ({
      ...cell,
      isRevealed: cell.value !== null,
    }));

    set({
      cells: memoryCells,
      gamePhase: 'memorizing',
      statusMessage: `Memorize the positions! Time: ${duration / 1000}s`,
      isLoading: true,
    });

    // Hide numbers after duration
    setTimeout(() => {
      const hiddenCells = cells.map((cell) => ({
        ...cell,
        isRevealed: false,
        showError: false,
      }));

      set({
        cells: hiddenCells,
        gamePhase: 'playing',
        statusMessage: 'Find number 1!',
        isLoading: false,
      });
    }, duration);
  },

  handleCellClick: async (cellId: number) => {
    const { cells, currentTarget, gamePhase, moves } = get();

    if (gamePhase !== 'playing') return;

    const clickedCell = cells[cellId];
    if (clickedCell.isCorrect) return; // Already revealed

    const newMoves = moves + 1;

    if (clickedCell.value === currentTarget) {
      // Correct click - play success sound
      await SoundService.playCorrectSound();

      const newCells = cells.map((cell) =>
        cell.id === cellId
          ? { ...cell, isRevealed: true, isCorrect: true }
          : cell
      );

      const nextTarget = currentTarget + 1;

      if (nextTarget > 9) {
        // Victory! Play celebration sound
        await SoundService.playVictorySound();

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
      await SoundService.playErrorSound();

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
