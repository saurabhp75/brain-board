import { View, TextInput } from 'react-native';
import { useColorScheme } from '@/lib/useColorScheme';
import { Minus, Plus } from 'lucide-react-native';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/nativewindui/Button';
import { COLORS } from '@/theme/colors';

const DurationInput = () => {
  const duration = useGameStore((state) => state.duration);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const setDuration = useGameStore((state) => state.setDuration);

  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  const handleDurationChange = (text: string) => {
    const cleanedValue = text.replace(/[^0-9]/g, '');
    const numValue = parseInt(cleanedValue, 10);
    if (!isNaN(numValue)) {
      setDuration(numValue);
    } else {
      setDuration(0);
    }
  };

  function handleDecrement() {
    const newValue = duration - 100;
    setDuration(newValue);
  }

  function handleIncrement() {
    const newValue = duration + 100;
    setDuration(newValue);
  }

  const disabled = gamePhase !== 'setup';

  return (
    <View
      className="flex-1 rounded-xl justify-center p-3 border shadow-sm"
      style={{
        backgroundColor: currentColors.card,
        borderColor: currentColors.grey4,
      }}
    >
      <View className="flex-row items-center gap-2">
        <Button
          variant={disabled ? 'secondary' : 'primary'}
          size="icon"
          className="rounded-lg w-11 h-11 justify-center items-center shadow-sm"
          style={{
            backgroundColor: disabled
              ? currentColors.grey4
              : currentColors.primary,
          }}
          onPress={handleDecrement}
          disabled={disabled}
        >
          <Minus
            color={disabled ? currentColors.grey2 : COLORS.white}
            size={20}
            strokeWidth={6}
          />
        </Button>
        <TextInput
          className="flex-1 border-2 rounded-lg px-3 pt-4 pb-3 text-sm h-12 text-center font-bold shadow-sm"
          style={{
            borderColor: disabled ? currentColors.grey4 : currentColors.primary,
            backgroundColor: disabled
              ? currentColors.grey6
              : currentColors.background,
            color: disabled ? currentColors.grey2 : currentColors.foreground,
          }}
          value={duration.toString()}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          placeholderTextColor={currentColors.grey2}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
        <Button
          variant={disabled ? 'secondary' : 'primary'}
          size="icon"
          className="rounded-lg w-11 h-11 justify-center items-center shadow-sm"
          style={{
            backgroundColor: disabled
              ? currentColors.grey4
              : currentColors.primary,
          }}
          onPress={handleIncrement}
          disabled={disabled}
        >
          <Plus
            color={disabled ? currentColors.grey2 : COLORS.white}
            size={20}
            strokeWidth={6}
          />
        </Button>
      </View>
    </View>
  );
};

export default DurationInput;
