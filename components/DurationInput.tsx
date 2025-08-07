import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import ThemedTextInput from './ThemedTextInput';
import { useGameStore } from '@/stores/gameStore';
import { useColorScheme } from '@/lib/useColorScheme';
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
      style={[
        styles.inputContainer,
        {
          backgroundColor: currentColors.background,
          borderColor: currentColors.root,
          shadowColor: currentColors.root,
        },
      ]}
    >
      <View style={styles.inputRow}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? currentColors.background
                : currentColors.primary,
              shadowColor: disabled
                ? currentColors.root
                : currentColors.primary,
            },
          ]}
          onPress={handleDecrement}
          disabled={disabled}
        >
          <Minus
            color={disabled ? currentColors.background : '#ffffff'}
            size={20}
            strokeWidth={6}
          />
        </TouchableOpacity>
        <ThemedTextInput
          style={[
            styles.durationInput,
            {
              borderColor: disabled
                ? currentColors.background
                : currentColors.foreground,
              backgroundColor: disabled
                ? currentColors.background
                : currentColors.foreground,
              color: disabled
                ? currentColors.background
                : currentColors.primary,
              shadowColor: currentColors.root,
              fontFamily: 'System',
              fontWeight: 'bold',
            },
          ]}
          value={duration.toString()}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          placeholderTextColor={currentColors.background}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? currentColors.background
                : currentColors.primary,
              shadowColor: disabled
                ? currentColors.root
                : currentColors.primary,
            },
          ]}
          onPress={handleIncrement}
          disabled={disabled}
        >
          <Plus
            color={disabled ? currentColors.background : '#ffffff'}
            size={20}
            strokeWidth={6}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  durationInput: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    fontSize: 14,
    height: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 18,
    includeFontPadding: false,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default DurationInput;
