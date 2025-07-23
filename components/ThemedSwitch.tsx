import React from 'react';
import { Switch, SwitchProps, useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

interface ThemedSwitchProps
  extends Omit<SwitchProps, 'trackColor' | 'thumbColor'> {
  /**
   * Custom track colors for false/true states.
   * If not provided, uses theme colors.
   */
  trackColor?: {
    false?: string;
    true?: string;
  };
  /**
   * Custom thumb color when switch is enabled.
   * If not provided, uses theme color.
   */
  thumbColorEnabled?: string;
  /**
   * Custom thumb color when switch is disabled.
   * If not provided, uses theme color.
   */
  thumbColorDisabled?: string;
}

const ThemedSwitch: React.FC<ThemedSwitchProps> = ({
  trackColor,
  thumbColorEnabled,
  thumbColorDisabled,
  value,
  ...props
}) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  const defaultTrackColor = {
    false: trackColor?.false ?? theme.surfaceContainerLow,
    true: trackColor?.true ?? theme.primary,
  };

  const defaultThumbColor = value
    ? thumbColorEnabled ?? theme.iconActive
    : thumbColorDisabled ?? theme.onSurfaceVariant;

  return (
    <Switch
      value={value}
      trackColor={defaultTrackColor}
      thumbColor={defaultThumbColor}
      {...props}
    />
  );
};

export default ThemedSwitch;
