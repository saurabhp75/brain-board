import { Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';

import type { TextProps, TextStyle } from 'react-native';

type ThemedTextProps = TextProps & {
  title?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  style?: TextStyle | TextStyle[];
};

const ThemedText = ({
  style,
  title = false,
  secondary = false,
  tertiary = false,
  disabled = false,
  ...props
}: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const getTextColor = () => {
    if (disabled) return theme.onSurfaceDisabled;
    if (title) return theme.onBackground;
    if (secondary) return theme.onSurfaceVariant;
    if (tertiary) return theme.onBackgroundVariant;
    return theme.onSurface;
  };

  return <Text style={[{ color: getTextColor() }, style]} {...props} />;
};

export default ThemedText;
