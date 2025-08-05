import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { SoundService } from '@/services/soundService';
import { SQUARES_IN_GRID } from '@/constants/layouts';

export const GAME_STATUS = {
  setup: 'Set duration and press Start Game',
  memorizing: 'Memorize the numbers',
  playing: 'Find the number',
  victory: 'Congratulations! You have won! 🎉',
};

export interface GameCell {
  id: number; // Index
  value: number; // Number value (1-9) or 0(default) if empty
  isRevealed: boolean; // Show the cell value? default false
  showError: boolean; // if true show 'X' instead of value (default false)
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

export const useGameStore = create(
  combine(
    // Initial state
    {
      // Game state
      cells: createEmptyGrid(),
      currentTarget: 1,
      gamePhase: 'setup' as 'setup' | 'memorizing' | 'playing' | 'victory',

      // Settings
      duration: 3000,

      // Stats
      moves: 0,
    },

    // Actions
    (set, get) => ({
      startGame: () => {
        const { duration } = get();

        // Create grid with numbers showing for memorization phase
        const memoryCells = createEmptyGrid(SQUARES_IN_GRID, true);

        // Show the numbers for memorization phase
        set({
          cells: memoryCells,
          gamePhase: 'memorizing',
        });

        // Hide numbers after duration
        setTimeout(() => {
          const hiddenCells = memoryCells.map((cell) => ({
            ...cell,
            isRevealed: false, // Hide the number
          }));

          // Hide the numbers and start the game
          set({
            cells: hiddenCells,
            gamePhase: 'playing',
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
              moves: newMoves,
            });
          } else {
            set({
              cells: newCells,
              currentTarget: nextTarget,
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
            moves: newMoves,
          });

          // Hide error after 200ms
          setTimeout(() => {
            const resetCells = get().cells.map((cell) =>
              cell.id === cellId ? { ...cell, showError: false } : cell
            );

            set({
              cells: resetCells,
            });
          }, 200);
        }
      },

      setDuration: (duration: number) => {
        // Keep the duration within bounds
        const clampedDuration = Math.max(0, Math.min(10000, duration));
        set({ duration: clampedDuration });
      },

      resetGame: () => {
        set({
          cells: createEmptyGrid(),
          currentTarget: 1,
          gamePhase: 'setup',
          moves: 0,
        });
      },
    })
  )
);
