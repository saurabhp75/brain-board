import { View } from 'react-native';
import DurationInput from './DurationInput';
import GameStatus from './GameStatus';
import GameButton from './GameButton';

export default function GameControls() {
  return (
    <View className="bg-background">
      {/* Game Status Display */}
      <GameStatus />
      {/* Duration Input */}
      <DurationInput />
      {/* Game Control Button */}
      <GameButton />
    </View>
  );
}
