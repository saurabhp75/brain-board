import ThemedView from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, useColorScheme } from 'react-native';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: { backgroundColor: theme.navBackground },
          headerTintColor: theme.title,
        }}
      />
      <ThemedView style={styles.container}>
        <Text style={[styles.text, { color: theme.title }]}>
          This screen doesn&apos;t exist.
        </Text>
        <Link
          href="/"
          style={[styles.link, { backgroundColor: theme.buttonPrimary }]}
        >
          <Text style={[styles.linkText, { color: '#ffffff' }]}>
            Go to home screen!
          </Text>
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
    fontSize: 20,
    fontWeight: 600,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
