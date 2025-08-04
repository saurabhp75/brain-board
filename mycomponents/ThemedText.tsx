import { Text, useColorScheme } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

import type { TextProps, TextStyle } from 'react-native';

type ThemedTextProps = TextProps & {
  title?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  disabled?: boolean;
  variant?: 'body' | 'heading' | 'caption' | 'numbers' | 'score';
  size?: keyof typeof Fonts.size;
  weight?: keyof typeof Fonts.weight;
  style?: TextStyle | TextStyle[];
};

const ThemedText = ({
  style,
  title = false,
  secondary = false,
  tertiary = false,
  disabled = false,
  variant = 'body',
  size = 'base',
  weight = 'regular',
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

  const getFontFamily = () => {
    switch (variant) {
      case 'heading':
        return Fonts.game.title;
      case 'numbers':
        return Fonts.game.numbers;
      case 'score':
        return Fonts.game.score;
      case 'caption':
        return Fonts.game.body;
      default:
        return Fonts.game.body;
    }
  };

  const getLetterSpacing = () => {
    switch (variant) {
      case 'heading':
        return Fonts.letterSpacing.tight;
      case 'numbers':
      case 'score':
        return Fonts.letterSpacing.wide;
      default:
        return Fonts.letterSpacing.normal;
    }
  };

  const modernTextStyle: TextStyle = {
    color: getTextColor(),
    fontFamily: getFontFamily(),
    fontSize: Fonts.size[size],
    fontWeight: Fonts.weight[weight],
    letterSpacing: getLetterSpacing(),
    lineHeight: Fonts.size[size] * Fonts.lineHeight.normal,
  };

  return <Text style={[modernTextStyle, style]} {...props} />;
};

export default ThemedText;
