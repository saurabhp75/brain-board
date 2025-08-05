import { Link, Stack } from 'expo-router';
import { View, Text } from 'react-native';
import { COLORS } from '@/theme/colors';
import { useColorScheme } from '@/lib/useColorScheme';

export default function NotFoundScreen() {
  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  return (
    <>
      <Stack.Screen
        options={{
          title: 'MemoryGamePro',
          headerStyle: {
            backgroundColor: currentColors.background,
          },
          headerTintColor: currentColors.foreground,
        }}
      />
      <View
        className="flex-1 items-center justify-center p-5"
        style={{
          backgroundColor: currentColors.background,
        }}
      >
        <Text
          className="text-2xl font-semibold text-center mb-4"
          style={{
            color: currentColors.foreground,
          }}
        >
          This screen doesn&apos;t exist.
        </Text>
        <Link
          href="/"
          className="mt-4 py-4 px-6 rounded-lg items-center"
          style={{
            backgroundColor: currentColors.primary,
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
