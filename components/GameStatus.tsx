import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import { useGameStore } from '@/stores/gameStore';
import { GAME_STATUS } from '@/stores/gameStore';
import { Colors } from '@/constants/Colors';

const GameStatus = () => {
  const { gamePhase, moves } = useGameStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemedView
      style={[
        styles.statusContainer,
        {
          backgroundColor: theme.surfaceContainerHigh,
          borderColor: theme.outline,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <ThemedText style={[styles.statusMessage, { color: theme.onBackground }]}>
        {GAME_STATUS[gamePhase]}
      </ThemedText>

      {gamePhase === 'playing' && (
        <ThemedView style={styles.statsContainer}>
          <ThemedView
            style={[
              styles.statItem,
              {
                backgroundColor: theme.surfaceContainerHighest,
                borderColor: theme.outlineVariant,
              },
            ]}
          >
            <ThemedText
              style={[styles.statLabel, { color: theme.onSurfaceVariant }]}
            >
              Moves
            </ThemedText>
            <ThemedText style={[styles.statValue, { color: theme.primary }]}>
              {moves}
            </ThemedText>
          </ThemedView>
          {/* <ThemedView style={styles.statItem}>
            <ThemedText style={styles.statLabel}>Score</ThemedText>
            <ThemedText style={styles.statValue}>{score}</ThemedText>
          </ThemedView> */}
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  statusMessage: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    gap: 20,
  },
  statItem: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    borderWidth: 1,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GameStatus;
