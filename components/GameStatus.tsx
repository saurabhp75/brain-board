import { StyleSheet, View, useColorScheme } from 'react-native';
import ThemedView from './ThemedView';
import ThemedText from './ThemedText';
import { useGameStore } from '@/stores/gameStore';
import { GAME_STATUS } from '@/stores/gameStore';
import { Colors } from '@/constants/Colors';

const GameStatus = () => {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const currentTarget = useGameStore((state) => state.currentTarget);
  const userName = useGameStore((state) => state.userName);

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
      {gamePhase === 'playing' ? (
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
              variant="score"
              size="sm"
              weight="bold"
              style={[styles.statLabel, { color: theme.onSurface }]}
            >
              {userName ? 'Player: ' + userName + '   ' : ''}Search:{' '}
              {currentTarget}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ) : (
        <ThemedView
          style={{
            alignItems: 'center',
            gap: 4,
            borderRadius: 8,
            paddingHorizontal: 24,
            paddingVertical: 8,
          }}
        >
          {userName ? (
            <ThemedText
              variant="body"
              size="sm"
              weight="bold"
              style={{ color: theme.onSurfaceVariant }}
            >
              {userName}
            </ThemedText>
          ) : null}
          <ThemedText
            variant="heading"
            size="sm"
            weight="semibold"
            style={[styles.statusMessage, { color: theme.onSurface }]}
          >
            {GAME_STATUS[gamePhase] || 'Game Status'}
          </ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: 'center',
    marginBottom: 15,
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    // minHeight: 60, // Ensure minimum height
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
    borderRadius: 8,
    width: '100%',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
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
