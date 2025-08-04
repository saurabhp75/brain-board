import ThemedView from '@/mycomponents/ThemedView';
import ThemedText from '@/mycomponents/ThemedText';
import { Colors } from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { StyleSheet, useColorScheme } from 'react-native';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: theme.navigationBackground },
          headerTintColor: theme.onBackground,
        }}
      />
      <ThemedView style={styles.container}>
        <ThemedText
          variant="heading"
          size="xl"
          weight="semibold"
          style={[styles.text, { color: theme.onBackground }]}
        >
          This screen doesn&apos;t exist.
        </ThemedText>
        <Link
          href="/"
          style={[styles.link, { backgroundColor: theme.primary }]}
        >
          <ThemedText
            variant="heading"
            size="base"
            weight="semibold"
            style={[styles.linkText, { color: '#ffffff' }]}
          >
            Go to home screen!
          </ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    // Modern typography handled by ThemedText
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    // Modern typography handled by ThemedText
  },
});
