import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Gamepad2, Info } from 'lucide-react-native';
import AdBanner from '@/components/AdBanner';
import ThemedView from '@/components/ThemedView';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemedView style={styles.container}>
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
      <AdBanner />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
