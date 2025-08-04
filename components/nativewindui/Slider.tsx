import RNSlider from '@react-native-community/slider';

import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';

function Slider({
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  ...props
}: React.ComponentPropsWithoutRef<typeof RNSlider>) {
  const { colors } = useColorScheme();
  return (
    <RNSlider
      thumbTintColor={
        (thumbTintColor ?? process.env.EXPO_OS === 'ios') ? COLORS.white : colors.primary
      }
      minimumTrackTintColor={minimumTrackTintColor ?? colors.primary}
      maximumTrackTintColor={
        (maximumTrackTintColor ?? process.env.EXPO_OS === 'android') ? colors.primary : undefined
      }
      {...props}
    />
  );
}

export { Slider };
