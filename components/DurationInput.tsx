import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';
import { useState } from 'react';
import { useGameStore } from '@/stores/gameStore';

const DurationInput = () => {
  const { duration, gamePhase, setDuration } = useGameStore();

  const [durationInput, setDurationInput] = useState(duration.toString());

  const handleDurationChange = (text: string) => {
    setDurationInput(text);
    const cleanedValue = text.replace(/[^0-9]/g, '');
    const numValue = parseInt(cleanedValue, 10);
    if (!isNaN(numValue)) {
      setDuration(numValue);
    } else {
      setDuration(3000); // Default value if input is invalid
    }
  };

  function handleDecrement() {
    const currentValue = parseInt(durationInput, 10);
    const newValue = Math.max(1, currentValue - 100); // Minimum 1 ms
    setDurationInput(newValue.toString());
    setDuration(newValue);
  }

  function handleIncrement() {
    const currentValue = parseInt(durationInput, 10);
    const newValue = Math.min(10000, currentValue + 100); // Maximum 10 seconds
    setDurationInput(newValue.toString());
    setDuration(newValue);
  }

  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedText>Duration:</ThemedText>
      <ThemedView style={styles.inputRow}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <ThemedText style={styles.buttonText}>-</ThemedText>
        </TouchableOpacity>
        <TextInput
          style={styles.durationInput}
          value={durationInput}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          editable={gamePhase === 'setup'}
          selectTextOnFocus={gamePhase === 'setup'}
        />
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <ThemedText style={styles.buttonText}>+</ThemedText>
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 12,
    shadowColor: '#000',
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    minWidth: 60,
    color: '#374151',
  },
  durationInput: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
    height: 48,
    textAlign: 'center',
    textAlignVertical: 'center',
    lineHeight: 18,
    includeFontPadding: false,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#4f46e5',
    borderRadius: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4f46e5',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DurationInput;
