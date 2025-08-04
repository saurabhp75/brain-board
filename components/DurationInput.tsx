import { useColorScheme, View, TextInput } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { useGameStore } from '@/stores/gameStore';
import { Button } from '@/components/nativewindui/Button';

const DurationInput = () => {
  const duration = useGameStore((state) => state.duration);
  const gamePhase = useGameStore((state) => state.gamePhase);
  const setDuration = useGameStore((state) => state.setDuration);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      className={`flex-1 rounded-xl justify-center p-3 border ${
        isDark
          ? 'bg-gray-800 border-gray-600 shadow-gray-900'
          : 'bg-white border-gray-300 shadow-gray-400'
      } shadow-sm`}
    >
      <View className="flex-row items-center gap-2">
        <Button
          variant={disabled ? 'secondary' : 'primary'}
          size="icon"
          className={`rounded-lg w-11 h-11 justify-center items-center ${
            disabled
              ? isDark
                ? 'bg-gray-700'
                : 'bg-gray-200'
              : isDark
              ? 'bg-blue-600'
              : 'bg-blue-500'
          } shadow-sm`}
          onPress={handleDecrement}
          disabled={disabled}
        >
          <Minus
            color={disabled ? (isDark ? '#6b7280' : '#9ca3af') : '#ffffff'}
            size={20}
            strokeWidth={6}
          />
        </Button>
        <TextInput
          className={`flex-1 border-2 rounded-lg px-3 pt-4 pb-3 text-sm h-12 text-center font-bold ${
            disabled
              ? isDark
                ? 'border-gray-600 bg-gray-800 text-gray-500'
                : 'border-gray-300 bg-gray-100 text-gray-400'
              : isDark
              ? 'border-gray-500 bg-gray-900 text-white'
              : 'border-blue-400 bg-white text-black'
          } shadow-sm`}
          value={duration.toString()}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          placeholderTextColor={isDark ? '#6b7280' : '#9ca3af'}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
        <Button
          variant={disabled ? 'secondary' : 'primary'}
          size="icon"
          className={`rounded-lg w-11 h-11 justify-center items-center ${
            disabled
              ? isDark
                ? 'bg-gray-700'
                : 'bg-gray-200'
              : isDark
              ? 'bg-blue-600'
              : 'bg-blue-500'
          } shadow-sm`}
          onPress={handleIncrement}
          disabled={disabled}
        >
          <Plus
            color={disabled ? (isDark ? '#6b7280' : '#9ca3af') : '#ffffff'}
            size={20}
            strokeWidth={6}
          />
        </Button>
      </View>
    </View>
  );
};

export default DurationInput;
