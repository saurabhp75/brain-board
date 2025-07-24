import { Tabs } from 'expo-router';
import { useColorScheme, StyleSheet, SafeAreaView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Gamepad2, Info, Settings } from 'lucide-react-native';
import AdBanner from '@/components/AdBanner';
import ThemedView from '@/components/ThemedView';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.adBannerContainer}>
        <AdBanner />
      </SafeAreaView>
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
                size={size + 4}
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
                size={size + 4}
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
                size={size + 4}
                color={focused ? theme.iconActive : theme.iconDefault}
              />
            ),
          }}
        />
      </Tabs>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  adBannerContainer: {
    backgroundColor: 'transparent',
  },
});
