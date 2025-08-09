import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Gamepad2, Info, Settings, BarChart3 } from 'lucide-react-native';
import AdBanner from '@/components/AdBanner';
import ThemedView from '@/components/ThemedView';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <AdBanner />
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
          <Tabs.Screen
            name="settings"
            options={{
              title: 'Settings',
              tabBarIcon: ({ size, focused }) => (
                <Settings
                  size={size}
                  color={focused ? theme.iconActive : theme.iconDefault}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="stats"
            options={{
              title: 'Stats',
              tabBarIcon: ({ size, focused }) => (
                <BarChart3
                  size={size}
                  color={focused ? theme.iconActive : theme.iconDefault}
                />
              ),
            }}
          />
        </Tabs>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
