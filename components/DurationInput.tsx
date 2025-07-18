import { StyleSheet, Text, TextInput, View } from 'react-native';
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
  return (
    <ThemedView style={styles.inputContainer}>
      <ThemedView style={styles.inputRow}>
        <ThemedText style={styles.label}>Duration:</ThemedText>
        <TextInput
          style={styles.durationInput}
          value={durationInput}
          onChangeText={handleDurationChange}
          keyboardType="numeric"
          placeholder="3000"
          editable={gamePhase === 'setup'}
          selectTextOnFocus={gamePhase === 'setup'}
        />
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
    padding: 12,
    fontSize: 14,
    backgroundColor: '#ffffff',
    height: 44,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default DurationInput;
