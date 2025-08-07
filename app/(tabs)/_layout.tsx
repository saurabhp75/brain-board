import { Tabs } from 'expo-router';
import { Gamepad2, Info, Settings } from 'lucide-react-native';
import { COLORS } from '@/theme/colors';
import { useColorScheme } from '@/lib/useColorScheme';
import { SafeAreaView, View } from 'react-native';
import AdBanner from '@/components/AdBanner';

export default function TabLayout() {
  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
    >
      <View
        className="flex-1"
        style={{ backgroundColor: currentColors.background }}
      >
        <AdBanner />
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
      </View>
    </SafeAreaView>
  );
}
