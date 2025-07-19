import { useFonts } from 'expo-font';

export const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    // Using system fonts with better fallbacks for now
    // You can replace these with actual font files later
    'Inter-Light': 'System',
    'Inter-Regular': 'System',
    'Inter-Medium': 'System',
    'Inter-SemiBold': 'System',
    'Inter-Bold': 'System',

    'Poppins-Light': 'System',
    'Poppins-Regular': 'System',
    'Poppins-Medium': 'System',
    'Poppins-SemiBold': 'System',
    'Poppins-Bold': 'System',
    'Poppins-ExtraBold': 'System',

    'JetBrainsMono-Regular': 'Courier New',
    'JetBrainsMono-Medium': 'Courier New',
    'JetBrainsMono-Bold': 'Courier New',
  });

  return fontsLoaded;
};
