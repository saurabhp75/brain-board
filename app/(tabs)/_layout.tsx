import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Gamepad2, Info } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.iconDefault,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.outline,
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
              color={focused ? theme.iconActive : theme.iconDefault}
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
              color={focused ? theme.iconActive : theme.iconDefault}
            />
          ),
        }}
      />
    </Tabs>
  );
}
