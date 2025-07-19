import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';
import { useGameStore } from '@/stores/gameStore';
import { Colors } from '@/constants/Colors';

const DurationInput = () => {
  const { duration, gamePhase, setDuration } = useGameStore();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

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
    <ThemedView
      style={[
        styles.inputContainer,
        {
          backgroundColor: theme.surfaceContainerHigh,
          borderColor: theme.outline,
          shadowColor: theme.shadow,
        },
      ]}
    >
      <ThemedText variant="caption" size="sm" weight="medium" secondary>
        Duration:
      </ThemedText>
      <ThemedView style={styles.inputRow}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? theme.surfaceContainerLow
                : theme.primary,
              shadowColor: disabled ? theme.surfaceContainerLow : theme.primary,
            },
          ]}
          onPress={handleDecrement}
          disabled={disabled}
        >
          <AntDesign
            name="minus"
            color={disabled ? theme.onSurfaceDisabled : '#ffffff'}
            size={20}
          />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.durationInput,
            {
              borderColor: disabled ? theme.outlineVariant : theme.inputOutline,
              backgroundColor: disabled
                ? theme.surfaceContainerHighest
                : theme.inputSurface,
              color: disabled ? theme.onSurfaceDisabled : theme.inputText,
              shadowColor: theme.shadow,
              fontFamily: 'System',
              fontWeight: '600',
            },
          ]}
          value={duration.toString()}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          placeholderTextColor={theme.placeholder}
          editable={!disabled}
          selectTextOnFocus={!disabled}
        />
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: disabled
                ? theme.surfaceContainerLow
                : theme.primary,
              shadowColor: disabled ? theme.surfaceContainerLow : theme.primary,
            },
          ]}
          onPress={handleIncrement}
          disabled={disabled}
        >
          <AntDesign
            name="plus"
            color={disabled ? theme.onSurfaceDisabled : '#ffffff'}
            size={20}
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
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
