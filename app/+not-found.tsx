import { Link, Stack } from 'expo-router';
import { View, Text, useColorScheme } from 'react-native';
import { COLORS } from '@/theme/colors';

export default function NotFoundScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Oops!',
          headerStyle: {
            backgroundColor: isDark
              ? COLORS.dark.background
              : COLORS.light.background,
          },
          headerTintColor: isDark
            ? COLORS.dark.foreground
            : COLORS.light.foreground,
        }}
      />
      <View
        className="flex-1 items-center justify-center p-5"
        style={{
          backgroundColor: isDark
            ? COLORS.dark.background
            : COLORS.light.background,
        }}
      >
        <Text
          className="text-2xl font-semibold text-center mb-4"
          style={{
            color: isDark ? COLORS.dark.foreground : COLORS.light.foreground,
          }}
        >
          This screen doesn&apos;t exist.
        </Text>
        <Link
          href="/"
          className="mt-4 py-4 px-6 rounded-lg items-center"
          style={{
            backgroundColor: isDark
              ? COLORS.dark.primary
              : COLORS.light.primary,
          }}
        >
          <Text
            className="text-base font-semibold"
            style={{ color: COLORS.white }}
          >
            Go to home screen!
          </Text>
        </Link>
      </View>
    </>
  );
}
