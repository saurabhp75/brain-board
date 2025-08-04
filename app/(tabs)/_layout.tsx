import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Gamepad2, Info, Settings } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark
          ? COLORS.dark.primary
          : COLORS.light.primary,
        tabBarInactiveTintColor: isDark
          ? COLORS.dark.grey2
          : COLORS.light.grey2,
        tabBarStyle: {
          backgroundColor: isDark ? COLORS.dark.card : COLORS.light.card,
          borderTopColor: isDark ? COLORS.dark.grey4 : COLORS.light.grey4,
        },
        headerShown: false,
      }}
      initialRouteName="game"
    >
      <Tabs.Screen
        name="game"
        options={{
          title: 'Game',
          tabBarIcon: ({ size, focused }) => (
            <Gamepad2
              size={size}
              color={
                focused
                  ? isDark
                    ? COLORS.dark.primary
                    : COLORS.light.primary
                  : isDark
                  ? COLORS.dark.grey2
                  : COLORS.light.grey2
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarIcon: ({ size, focused }) => (
            <Info
              size={size}
              color={
                focused
                  ? isDark
                    ? COLORS.dark.primary
                    : COLORS.light.primary
                  : isDark
                  ? COLORS.dark.grey2
                  : COLORS.light.grey2
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ size, focused }) => (
            <Settings
              size={size}
              color={
                focused
                  ? isDark
                    ? COLORS.dark.primary
                    : COLORS.light.primary
                  : isDark
                  ? COLORS.dark.grey2
                  : COLORS.light.grey2
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}
