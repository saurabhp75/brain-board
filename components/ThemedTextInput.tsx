import { TextInput, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.inputBackground,
          color: theme.inputText,
          borderColor: focused ? theme.inputBorderFocus : theme.inputBorder,
          borderWidth: 1,
          padding: 16,
          borderRadius: 8,
        },
        style,
      ]}
      placeholderTextColor={theme.textPlaceholder}
      {...props}
    />
  );
}
