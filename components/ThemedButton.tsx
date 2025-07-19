import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
  useColorScheme,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface ThemedButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
  variant?: 'primary' | 'secondary';
}

function ThemedButton({
  style,
  variant = 'primary',
  ...props
}: ThemedButtonProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const getButtonStyles = (pressed: boolean) => {
    const baseStyle = [styles.btn, style];

    if (variant === 'primary') {
      baseStyle.push({
        backgroundColor: pressed
          ? theme.buttonPrimaryPressed
          : theme.buttonPrimary,
      });
    } else {
      baseStyle.push({
        backgroundColor: pressed
          ? theme.buttonSecondaryPressed
          : theme.buttonSecondary,
        borderWidth: 1,
        borderColor: theme.border,
      });
    }

    return baseStyle;
  };

  return (
    <Pressable style={({ pressed }) => getButtonStyles(pressed)} {...props} />
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 18,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ThemedButton;
