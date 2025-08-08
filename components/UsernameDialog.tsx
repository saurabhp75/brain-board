import { useEffect, useState } from 'react';
import {
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from 'react-native';
import ThemedTextInput from '@/components/ThemedTextInput';
import ThemedView from '@/components/ThemedView';
import ThemedText from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';

type UsernameDialogProps = {
  visible: boolean;
  initialValue?: string;
  onSubmit: (name: string) => void;
};

export default function UsernameDialog({
  visible,
  initialValue = '',
  onSubmit,
}: UsernameDialogProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;
  const [name, setName] = useState(initialValue);
  const [error, setError] = useState('');

  useEffect(() => {
    if (visible) {
      setName(initialValue || '');
      setError('');
    }
  }, [visible, initialValue]);

  const handleSave = () => {
    const trimmed = (name ?? '').trim();
    if (!trimmed) {
      setError('Please enter your name');
      return;
    }
    onSubmit(trimmed);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: 'padding', android: undefined })}
      >
        <ThemedView
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
        >
          <ThemedView
            style={{
              width: '100%',
              maxWidth: 420,
              backgroundColor: theme.background,
              borderColor: theme.outline,
              borderWidth: 2,
              borderRadius: 16,
              padding: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <ThemedText
              variant="heading"
              size="lg"
              weight="bold"
              style={{
                color: theme.onBackground,
                marginBottom: 12,
                textAlign: 'center',
              }}
            >
              Enter your name
            </ThemedText>

            <ThemedTextInput
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              focused={true}
            />

            {!!error && (
              <ThemedText
                variant="body"
                size="sm"
                style={{
                  color: theme.error,
                  marginTop: 8,
                  textAlign: 'center',
                }}
              >
                {error}
              </ThemedText>
            )}

            <ThemedView
              style={{
                marginTop: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  paddingVertical: 12,
                  paddingHorizontal: 18,
                  borderRadius: 10,
                  backgroundColor: theme.primary,
                  borderWidth: 2,
                  borderColor: theme.primary,
                }}
              >
                <ThemedText variant="body" size="base" weight="bold">
                  Save
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}
