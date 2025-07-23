import { StyleSheet, View, useColorScheme } from 'react-native';
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
      <ThemedText
        variant="heading"
        size="lg"
        weight="bold"
        style={[styles.statusMessage, { color: theme.onBackground }]}
      >
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
              variant="caption"
              size="sm"
              weight="bold"
              style={[styles.statLabel, { color: theme.onBackground }]}
            >
              MOVES :
            </ThemedText>
            <ThemedText
              variant="score"
              size="2xl"
              weight="bold"
              style={[styles.statValue, { color: theme.onBackground }]}
            >
              {moves}
            </ThemedText>
          </ThemedView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 12,
    flex: 1,
    borderWidth: 1,
    gap: 8,
  },
  statLabel: {
    textTransform: 'uppercase',
  },
  statValue: {
    // Modern typography handled by ThemedText variant
  },
});

export default GameStatus;
