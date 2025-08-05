import { ScrollView, View, Text, SafeAreaView } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { Toggle } from '@/components/nativewindui/Toggle';
import { COLORS } from '@/theme/colors';
import { SoundService } from '@/services/soundService';
import { useState } from 'react';
import AdBanner from '@/components/AdBanner';

export default function SettingsScreen() {
  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

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
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: currentColors.background }}
    >
      <View
        className="flex-1"
        style={{ backgroundColor: currentColors.background }}
      >
        <AdBanner />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 pb-10">
            {/* Header */}
            <View className="items-center pt-5 pb-4 px-5 min-h-[80px]">
              <Text
                className="text-3xl font-bold text-center"
                style={{ color: currentColors.foreground }}
              >
                ⚙️ Settings
              </Text>
              <View
                className="w-15 h-1 rounded-sm mt-2 opacity-80"
                style={{ backgroundColor: currentColors.primary }}
              />
            </View>

            {/* Settings Section */}
            <View className="px-5 pt-2.5">
              {/* Section Header */}
              <View
                className="rounded-xl mb-4 p-4 border-l-4"
                style={{
                  backgroundColor: currentColors.card,
                  borderLeftColor: currentColors.primary,
                  borderColor: currentColors.grey4,
                  borderWidth: 1,
                }}
              >
                <Text
                  className="text-lg font-bold"
                  style={{ color: currentColors.foreground }}
                >
                  🔊 Audio & Feedback
                </Text>
                <Text
                  className="text-sm mt-1"
                  style={{ color: currentColors.grey2 }}
                >
                  Customize your game experience
                </Text>
              </View>

              {/* Sound Toggle */}
              <View
                className="rounded-xl mb-3 border shadow-sm"
                style={{
                  backgroundColor: currentColors.card,
                  borderColor: currentColors.grey4,
                }}
              >
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-1">
                      <View
                        className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                        style={{
                          backgroundColor: soundEnabled
                            ? currentColors.primary
                            : currentColors.grey4,
                        }}
                      >
                        <Text
                          className="text-sm font-bold"
                          style={{
                            color: soundEnabled
                              ? currentColors.card
                              : currentColors.grey2,
                          }}
                        >
                          🔊
                        </Text>
                      </View>
                      <Text
                        className="font-semibold text-base"
                        style={{ color: currentColors.foreground }}
                      >
                        Sound Effects
                      </Text>
                    </View>
                    <Text
                      className="text-sm leading-[18px] ml-11"
                      style={{ color: currentColors.grey2 }}
                    >
                      Play audio feedback during gameplay interactions
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
                className="rounded-xl mb-3 border shadow-sm"
                style={{
                  backgroundColor: currentColors.card,
                  borderColor: currentColors.grey4,
                }}
              >
                <View className="flex-row items-center justify-between p-4">
                  <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-1">
                      <View
                        className="w-8 h-8 rounded-lg items-center justify-center mr-3"
                        style={{
                          backgroundColor: hapticsEnabled
                            ? currentColors.primary
                            : currentColors.grey4,
                        }}
                      >
                        <Text
                          className="text-sm font-bold"
                          style={{
                            color: hapticsEnabled
                              ? currentColors.card
                              : currentColors.grey2,
                          }}
                        >
                          📳
                        </Text>
                      </View>
                      <Text
                        className="font-semibold text-base"
                        style={{ color: currentColors.foreground }}
                      >
                        Haptic Feedback
                      </Text>
                    </View>
                    <Text
                      className="text-sm leading-[18px] ml-11"
                      style={{ color: currentColors.grey2 }}
                    >
                      Feel vibrations for game interactions and feedback
                    </Text>
                  </View>
                  <Toggle
                    value={hapticsEnabled}
                    onValueChange={handleHapticsToggle}
                  />
                </View>
              </View>

              {/* Info Card */}
              <View
                className="rounded-xl mt-6 p-4 border"
                style={{
                  backgroundColor: currentColors.grey6,
                  borderColor: currentColors.grey4,
                }}
              >
                <Text
                  className="text-sm text-center"
                  style={{ color: currentColors.grey }}
                >
                  💡 Settings are automatically saved and will persist between
                  app sessions
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
