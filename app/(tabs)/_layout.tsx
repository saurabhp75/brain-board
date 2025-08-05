import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Gamepad2, Info, Settings } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const currentColors = COLORS[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: currentColors.primary,
        tabBarInactiveTintColor: currentColors.grey2,
        tabBarStyle: {
          backgroundColor: currentColors.card,
          borderTopColor: currentColors.grey4,
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
              color={focused ? currentColors.primary : currentColors.grey2}
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
              color={focused ? currentColors.primary : currentColors.grey2}
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
              color={focused ? currentColors.primary : currentColors.grey2}
            />
          ),
        }}
      />
    </Tabs>
  );
}
