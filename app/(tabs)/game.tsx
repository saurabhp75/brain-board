import { useEffect } from 'react';
import {
  KeyboardAvoidingView,
  useColorScheme,
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import GameGrid from '@/components/GameGrid';
import GameStatus from '@/components/GameStatus';
import DurationInput from '@/components/DurationInput';
import GameButton from '@/components/GameButton';
import { useGameStore } from '@/stores/gameStore';
// import { useAuthStore } from '@/stores/authStore';
import { SoundService } from '@/services/soundService';
import { Confetti } from 'react-native-fast-confetti';
import { COLORS } from '@/theme/colors';
import AdBanner from '@/components/AdBanner';
// import {
//   KeyboardProvider,
//   KeyboardAvoidingView,
// } from 'react-native-keyboard-controller';

export default function GameScreen() {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    // Initialize sound service when component mounts
    const initializeSounds = async () => {
      await SoundService.initialize();
    };
    initializeSounds();

    // Cleanup when component unmounts
    return () => {
      SoundService.cleanup();
    };
  }, []);

  // useEffect(() => {
  //   if (gamePhase === 'playing' && gameStartTime === null) {
  //     setGameStartTime(Date.now());
  //   } else if (gamePhase === 'victory' && gameStartTime !== null) {
  //     const timeElapsed = Date.now() - gameStartTime;
  //     updateStats(timeElapsed);
  //     setGameStartTime(null);
  //   }
  // }, [gamePhase, gameStartTime, updateStats]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-background">
        <AdBanner />
        <KeyboardAvoidingView
          className="flex-1"
          behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={process.env.EXPO_OS === 'ios' ? 10 : 0}
        >
          <View className="flex-1 bg-background">
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

            {/* Game Status - Above Grid */}
            <View className="px-4 mb-4 min-h-[60px]">
              <GameStatus />
            </View>

            {/* Game Grid */}
            <View className="flex-1 justify-center items-center px-4 py-2.5 min-h-[200px]">
              <GameGrid />
            </View>

            {/* Bottom Controls - Fixed at bottom */}
            <View className="px-4 pt-2.5 pb-25 flex-col gap-4">
              <Text
                className={`text-center mb-1 font-bold ${
                  gamePhase !== 'setup'
                    ? isDark
                      ? 'text-gray-500'
                      : 'text-gray-400'
                    : isDark
                    ? 'text-white'
                    : 'text-black'
                }`}
              >
                Time (ms):
              </Text>
              <DurationInput />
              <GameButton />
            </View>

            {/* Confetti Animation */}
            {gamePhase === 'victory' && <Confetti />}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
