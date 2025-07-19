import { StyleSheet, useColorScheme, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface ThemedCardProps extends React.ComponentProps<typeof View> {
  elevated?: boolean;
}

const ThemedCard = ({ style, elevated = false, ...props }: ThemedCardProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <View
      style={[
        {
          backgroundColor: elevated ? theme.cardElevated : theme.card,
          borderColor: theme.border,
          shadowColor: theme.shadow,
        },
        styles.card,
        elevated && styles.elevated,
        style,
      ]}
      {...props}
    />
  );
};

export default ThemedCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
  },
  elevated: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
