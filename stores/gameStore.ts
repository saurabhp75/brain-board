import { create } from 'zustand';
import { combine, persist, createJSONStorage } from 'zustand/middleware';
import { mmkvStorage } from '@/services/mmkv';
import { SoundService } from '@/services/soundService';

const SQUARES_IN_GRID = 9; // 3x3 grid

export const GAME_STATUS = {
  setup: 'Set duration and press Start Game',
  memorizing: 'Memorize the numbers',
  playing: 'Find the number',
  victory: 'Congratulations! You have won! 🎉',
  defeat: 'You lost the game. Try again!',
};

export interface GameCell {
  id: number; // Index
  value: number; // Number value (1-9) or 0(default) if empty
  isRevealed: boolean; // Show the cell content or question mark, default false
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
  persist(
    combine(
      // Initial state
      {
        // Game state
        cells: createEmptyGrid(),
        currentTarget: 1,
        gamePhase: 'setup' as
          | 'setup'
          | 'memorizing'
          | 'playing'
          | 'victory'
          | 'defeat',

        // Settings
        duration: 3000,

        // Stats
        moves: 0,
        misses: 0,
        gamesPlayed: 0,
        gamesWon: 0,
  // Per-user statistics keyed by userName
  statsByUser: {} as Record<string, { gamesPlayed: number; gamesWon: number; gamesLost: number }>,
        userName: '',
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
          const { cells, currentTarget, gamePhase, moves, misses } = get();

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

              // Update stats for current user
              const { userName, statsByUser, gamesPlayed, gamesWon } = get();
              if (userName) {
                const existing = statsByUser[userName] || {
                  gamesPlayed: 0,
                  gamesWon: 0,
                  gamesLost: 0,
                };
                const updated = {
                  gamesPlayed: existing.gamesPlayed + 1,
                  gamesWon: existing.gamesWon + 1,
                  gamesLost: existing.gamesLost,
                };
                set({
                  statsByUser: { ...statsByUser, [userName]: updated },
                  gamesPlayed: gamesPlayed + 1,
                  gamesWon: gamesWon + 1,
                });
              } else {
                // Still update global counters even if no userName set
                set({
                  gamesPlayed: get().gamesPlayed + 1,
                  gamesWon: get().gamesWon + 1,
                });
              }

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

            const updatedMisses = misses + 1;

            // If this is the second miss, end the game as defeat
            if (updatedMisses >= 2) {
              // Reveal all cells for feedback
              const revealedCells = newCells.map((c) => ({
                ...c,
                isRevealed: true,
                showError: false,
              }));

              // Update defeat stats
              const { userName, statsByUser, gamesPlayed } = get();
              if (userName) {
                const existing = statsByUser[userName] || {
                  gamesPlayed: 0,
                  gamesWon: 0,
                  gamesLost: 0,
                };
                const updated = {
                  gamesPlayed: existing.gamesPlayed + 1,
                  gamesWon: existing.gamesWon,
                  gamesLost: existing.gamesLost + 1,
                };
                set({
                  statsByUser: { ...statsByUser, [userName]: updated },
                  gamesPlayed: gamesPlayed + 1,
                });
              } else {
                set({ gamesPlayed: get().gamesPlayed + 1 });
              }

              set({
                cells: revealedCells,
                moves: newMoves,
                misses: updatedMisses,
                gamePhase: 'defeat',
              });

              return; // Early exit, no timeout needed
            }

            set({
              cells: newCells,
              moves: newMoves,
              misses: updatedMisses,
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

        setUserName: (name: string) => {
          const trimmed = (name ?? '').trim();
          if (!trimmed) {
            set({ userName: '' });
            return;
          }
          const { statsByUser } = get();
            // Initialize stats for new user if not present
          if (!statsByUser[trimmed]) {
            statsByUser[trimmed] = { gamesPlayed: 0, gamesWon: 0, gamesLost: 0 };
          }
          set({ userName: trimmed, statsByUser: { ...statsByUser } });
        },

        resetGame: () => {
          set({
            cells: createEmptyGrid(),
            currentTarget: 1,
            gamePhase: 'setup',
            moves: 0,
            misses: 0,
          });
        },
      })
    ),
    {
      name: 'game-store-v1',
      storage: createJSONStorage(() => mmkvStorage),
      // Only persist the settings and stats; avoid transient game board/phase
      partialize: (state: any) => ({
        duration: state.duration,
        moves: state.moves,
        misses: state.misses,
        gamesPlayed: state.gamesPlayed,
        gamesWon: state.gamesWon,
  statsByUser: state.statsByUser,
        userName: state.userName,
      }),
      version: 1,
      migrate: (persisted: any, _version: number) => {
        // Currently no migrations needed
        return persisted as any;
      },
    }
  )
);
