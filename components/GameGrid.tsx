import React, { useEffect, useRef } from 'react';
import { StyleSheet, useColorScheme, Animated } from 'react-native';
import { useGameStore } from '@/stores/gameStore';
import ThemedView from './ThemedView';
import { Cell } from './GameCell';
import { GRID_PADDING, GRID_SIZE } from '@/constants/layouts';
import { Colors } from '@/constants/Colors';

export default function GameGrid() {
  const cells = useGameStore((state) => state.cells);
  const gamePhase = useGameStore((state) => state.gamePhase);

  // Shared animated value for defeat pulse
  const defeatScale = useRef(new Animated.Value(1)).current;

  const defeatAnimationRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    // Stop any running loop first when phase changes
    if (defeatAnimationRef.current && gamePhase !== 'defeat') {
      defeatAnimationRef.current.stop();
      defeatAnimationRef.current = null;
      defeatScale.setValue(1);
    }
    if (gamePhase === 'defeat') {
      defeatScale.setValue(1);
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(defeatScale, {
            toValue: 1.1,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(defeatScale, {
            toValue: 0.95,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(defeatScale, {
            toValue: 1,
            duration: 160,
            useNativeDriver: true,
          }),
        ]),
        { iterations: 3 }
      );
      defeatAnimationRef.current = loop;
      loop.start(({ finished }) => {
        if (finished) {
          defeatAnimationRef.current = null;
          defeatScale.setValue(1);
        }
      });
    }
    return () => {
      if (defeatAnimationRef.current) {
        defeatAnimationRef.current.stop();
        defeatAnimationRef.current = null;
      }
    };
  }, [gamePhase, defeatScale]);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.grid,
          {
            backgroundColor: theme.surfaceVariant,
            borderColor: theme.outlineVariant,
            shadowColor: theme.shadow,
          },
        ]}
      >
        {cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
            defeatScale={gamePhase === 'defeat' ? defeatScale : undefined}
            isDefeat={gamePhase === 'defeat'}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    width: GRID_SIZE,
    height: GRID_SIZE,
    borderRadius: 15,
    padding: GRID_PADDING,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    // elevation: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
});
