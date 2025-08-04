import {
  ScrollView,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Toggle } from '@/components/nativewindui/Toggle';
import { COLORS } from '@/theme/colors';
import { SoundService } from '@/services/soundService';
import { useState } from 'react';
import AdBanner from '@/mycomponents/AdBanner';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Initialize state from SoundService
  const [soundEnabled, setSoundEnabled] = useState(
    SoundService.isSoundServiceEnabled()
  );
  const [hapticsEnabled, setHapticsEnabled] = useState(
    SoundService.isHapticServiceEnabled()
  );

  // Handle sound toggle
  const handleSoundToggle = (value: boolean) => {
    setSoundEnabled(value);
    SoundService.setSoundEnabled(value);
  };

  // Handle haptics toggle
  const handleHapticsToggle = (value: boolean) => {
    setHapticsEnabled(value);
    SoundService.setHapticsEnabled(value);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <AdBanner />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 pb-10">
            {/* Header */}
            <View className="items-center pt-5 pb-4 px-5 min-h-[80px]">
              <Text
                className={`text-3xl font-bold text-center ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                ⚙️ Settings
              </Text>
              <View
                className={`w-15 h-1 rounded-sm mt-2 opacity-80 ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
              />
            </View>

            {/* Settings Section */}
            <View className="px-5 pt-2.5">
              <Text
                className={`text-lg font-bold mb-5 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Audio & Feedback
              </Text>

              {/* Sound Toggle */}
              <View
                className={`rounded-xl mb-3 border shadow-sm ${
                  isDark
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-1 mr-4">
                    <Text
                      className={`font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      Sound Effects
                    </Text>
                    <Text
                      className={`text-sm opacity-80 leading-[18px] ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Play sounds in game.
                    </Text>
                  </View>
                  <Toggle
                    value={soundEnabled}
                    onValueChange={handleSoundToggle}
                  />
                </View>
              </View>

              {/* Haptics Toggle */}
              <View
                className={`rounded-xl mb-3 border shadow-sm ${
                  isDark
                    ? 'bg-gray-800 border-gray-600'
                    : 'bg-white border-gray-300'
                }`}
              >
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-1 mr-4">
                    <Text
                      className={`font-semibold mb-1 ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      Haptic Feedback
                    </Text>
                    <Text
                      className={`text-sm opacity-80 leading-[18px] ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      Vibrate on game interactions
                    </Text>
                  </View>
                  <Toggle
                    value={hapticsEnabled}
                    onValueChange={handleHapticsToggle}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
