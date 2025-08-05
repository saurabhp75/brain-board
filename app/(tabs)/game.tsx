import { useEffect } from 'react';
import { KeyboardAvoidingView, View, Text, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import { useColorScheme } from '@/lib/useColorScheme';
// import {
//   KeyboardProvider,
//   KeyboardAvoidingView,
// } from 'react-native-keyboard-controller';

export default function GameScreen() {
  const gamePhase = useGameStore((state) => state.gamePhase);
  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];
  const insets = useSafeAreaInsets();

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
    <SafeAreaView
      style={{ flex: 1, backgroundColor: currentColors.background }}
    >
      <View style={{ flex: 1, backgroundColor: currentColors.background }}>
        <AdBanner />
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={process.env.EXPO_OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={process.env.EXPO_OS === 'ios' ? 10 : 0}
        >
          <View style={{ flex: 1, backgroundColor: currentColors.background }}>
            {/* Header */}
            <View className="items-center pt-3 pb-2 px-5 min-h-[60px]">
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: currentColors.foreground,
                }}
              >
                🧠 Memory Game Pro
              </Text>
              <View
                style={{
                  width: 60,
                  height: 4,
                  borderRadius: 2,
                  marginTop: 6,
                  opacity: 0.8,
                  backgroundColor: currentColors.primary,
                }}
              />
            </View>

            {/* Game Status - Above Grid */}
            <View className="px-4 mb-2 min-h-[50px]">
              <GameStatus />
            </View>

            {/* Game Grid */}
            <View className="flex-1 justify-center items-center px-4 py-1 min-h-[180px]">
              <GameGrid />
            </View>

            {/* Bottom Controls - Fixed at bottom */}
            <View
              className="px-4 pt-2 flex-col"
              style={{ paddingBottom: Math.max(insets.bottom + 20, 100) }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 12,
                  fontWeight: 'bold',
                  color:
                    gamePhase !== 'setup'
                      ? currentColors.grey2
                      : currentColors.foreground,
                }}
              >
                Time (ms):
              </Text>
              <DurationInput />
              <View className="pt-5">
                <GameButton />
              </View>
            </View>

            {/* Confetti Animation */}
            {gamePhase === 'victory' && <Confetti />}
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}
