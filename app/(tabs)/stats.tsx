import { StyleSheet, FlatList, useColorScheme, View } from 'react-native';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useGameStore } from '@/stores/gameStore';

interface StatItemProps {
  user: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number; // still coming from store but not displayed directly
}

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const statsByUser = useGameStore((s) => s.statsByUser);

  const data: StatItemProps[] = Object.entries(statsByUser).map(
    ([user, stats]) => ({ user, ...stats })
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText
        variant="heading"
        size="2xl"
        weight="bold"
        style={[styles.title, { color: theme.onBackground }]}
      >
        📊 Player Stats
      </ThemedText>
      {data.length === 0 && (
        <ThemedText
          variant="body"
          size="sm"
          style={{ color: theme.onSurfaceVariant, marginTop: 24 }}
        >
          No stats yet. Play a game to get started.
        </ThemedText>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.user}
        contentContainerStyle={{ paddingVertical: 16 }}
        renderItem={({ item }) => {
          const winRate = item.gamesPlayed
            ? Math.round((item.gamesWon / item.gamesPlayed) * 100)
            : 0;
          return (
            <ThemedView
              style={[
                styles.card,
                {
                  backgroundColor: theme.surfaceContainerHigh,
                  borderColor: theme.outline,
                  shadowColor: theme.shadow,
                },
              ]}
            >
              <View style={styles.cardHeader}>                
                <ThemedText
                  variant="heading"
                  size="lg"
                  weight="bold"
                  style={{ color: theme.onBackground }}
                >
                  {item.user}
                </ThemedText>
                <ThemedText
                  variant="body"
                  size="sm"
                  style={{ color: theme.onSurfaceVariant }}
                >
                  Win Rate: {winRate}%
                </ThemedText>
              </View>
              <View style={styles.row}>                
                <Stat label="Played" value={item.gamesPlayed} color={theme.info} />
                <Stat label="Won" value={item.gamesWon} color={theme.success} />
                <Stat label="Success %" value={winRate} color={theme.primary} />
              </View>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
}

const Stat = ({ label, value, color }: { label: string; value: number; color: string }) => {
  return (
    <ThemedView style={styles.statItem}>
      <ThemedText
        variant="body"
        size="xs"
        weight="semibold"
        style={{ color }}
      >
        {label}
      </ThemedText>
      <ThemedText
        variant="numbers"
        size="lg"
        weight="extrabold"
        style={{ color }}
      >
        {value}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statItem: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
