import {
  ScrollView,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '@/theme/colors';
import AdBanner from '@/components/AdBanner';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? COLORS.dark : COLORS.light;

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: theme.background }}
    >
      <View className="flex-1" style={{ backgroundColor: theme.background }}>
        <AdBanner />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="flex-1 pb-10">
            {/* Header */}
            <View className="items-center pt-5 pb-4 px-5 min-h-[80px]">
              <Text
                className="text-3xl font-bold text-center"
                style={{ color: theme.foreground }}
              >
                🧠 Memory Game Pro
              </Text>
              <View
                className="w-15 h-1 rounded-sm mt-2 opacity-80"
                style={{ backgroundColor: theme.primary }}
              />
            </View>

            {/* Content */}
            <View className="px-5 pt-2.5">
              {/* Welcome Card */}
              <View
                className="rounded-xl mb-6 p-4 border shadow-sm"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.grey4,
                }}
              >
                <Text
                  className="text-lg text-center mb-3 font-semibold"
                  style={{ color: theme.foreground }}
                >
                  Welcome to Memory Game Pro - the ultimate brain challenge!
                </Text>
                <Text
                  className="text-base text-center leading-5"
                  style={{ color: theme.grey2 }}
                >
                  Test and improve your memory skills with our fun and
                  challenging game. Flip cards to find the numbers in sequence
                  as quickly as possible.
                </Text>
              </View>

              {/* How to Play Card */}
              <View
                className="rounded-xl mb-6 p-4 border shadow-sm"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.grey4,
                }}
              >
                <Text
                  className="text-lg font-bold mb-4"
                  style={{ color: theme.foreground }}
                >
                  How to Play:
                </Text>

                {[
                  'Set your game time in milliseconds.',
                  'Tap "Start Game" to begin.',
                  'Tap the squares to find the next number starting from 1.',
                  'Repeat until you have found all numbers in sequence.',
                ].map((step, index) => (
                  <View key={index} className="flex-row items-start mb-3">
                    <View
                      className="w-6 h-6 rounded-full items-center justify-center mr-3 mt-0.5"
                      style={{ backgroundColor: theme.primary }}
                    >
                      <Text
                        className="text-sm font-bold"
                        style={{ color: theme.card }}
                      >
                        {index + 1}
                      </Text>
                    </View>
                    <Text
                      className="flex-1 text-base leading-5"
                      style={{ color: theme.grey2 }}
                    >
                      {step}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Features Card */}
              <View
                className="rounded-xl mb-6 p-4 border shadow-sm"
                style={{
                  backgroundColor: theme.card,
                  borderColor: theme.grey4,
                }}
              >
                <Text
                  className="text-lg font-bold mb-4"
                  style={{ color: theme.foreground }}
                >
                  Game Features:
                </Text>

                {[
                  '🎯 Customizable game duration',
                  '🔊 Sound effects and haptic feedback',
                  '🌙 Dark and light mode support',
                  '📱 Optimized for mobile devices',
                  '🧠 Brain training and memory improvement',
                ].map((feature, index) => (
                  <Text
                    key={index}
                    className="text-base mb-2 leading-5"
                    style={{ color: theme.grey2 }}
                  >
                    {feature}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
