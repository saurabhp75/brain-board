import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { COLORS } from '@/theme/colors';
import { useColorScheme, useInitialAndroidBarSync } from '@/lib/useColorScheme';
import { NAV_THEME } from '@/theme';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';

export default function RootLayout() {
  useFrameworkReady();

  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const theme = isDarkColorScheme ? COLORS.dark : COLORS.light;

  return (
    <>
      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Stack
          screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: theme.background },
            headerTintColor: theme.foreground,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </NavThemeProvider>
    </>
  );
}
