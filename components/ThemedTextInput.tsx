import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';
import { TextInput } from 'react-native';

import type { TextInputProps, StyleProp, TextStyle } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
  focused?: boolean;
};

export default function ThemedTextInput({
  style,
  focused = false,
  ...props
}: ThemedTextInputProps) {
  const { colorScheme } = useColorScheme();
  const currentColors = COLORS[colorScheme];

  return (
    <TextInput
      style={[
        {
          backgroundColor: currentColors.background,
          color: currentColors.foreground,
          borderColor: focused ? currentColors.primary : currentColors.grey4,
          borderWidth: 2,
          padding: 16,
          borderRadius: 8,
          fontSize: 16,
          fontWeight: 'bold',
          textAlign: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
          elevation: 1,
        },
        style,
      ]}
      placeholderTextColor={currentColors.grey2}
      {...props}
    />
  );
}
