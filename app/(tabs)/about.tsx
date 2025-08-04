import {
  ScrollView,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '@/theme/colors';
import AdBanner from '@/mycomponents/AdBanner';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
                🧠 Memory Game Pro
              </Text>
              <View
                className={`w-15 h-1 rounded-sm mt-2 opacity-80 ${
                  isDark ? 'bg-white' : 'bg-black'
                }`}
              />
            </View>

            {/* Content */}
            <View className="px-5 pt-2.5">
              <Text
                className={`text-lg text-center mb-5 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Welcome to Memory Game Pro - the ultimate brain challenge!
              </Text>

              <Text
                className={`text-base text-center mb-7.5 leading-5 opacity-90 ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Test and improve your memory skills with our fun and challenging
                game. Flip cards to find the numbers in sequence as quickly as
                possible.
              </Text>

              <View className="mb-6">
                <Text
                  className={`text-lg font-semibold mb-3 ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  How to Play:
                </Text>

                <Text
                  className={`mb-2 pl-2.5 opacity-90 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  1. Set your game time in milliseconds.
                </Text>
                <Text
                  className={`mb-2 pl-2.5 opacity-90 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  2. Tap "Start Game" to begin.
                </Text>
                <Text
                  className={`mb-2 pl-2.5 opacity-90 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  3. Tap the squares to find the next number starting from 1.
                </Text>
                <Text
                  className={`mb-2 pl-2.5 opacity-90 text-base ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  4. Repeat until you have found all numbers in sequence.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
