import ThemedView from './ThemedView';
import DurationInput from './DurationInput';
import GameStatus from './GameStatus';
import GameButton from './GameButton';

export default function GameControls() {
  return (
    <ThemedView>
      {/* Gamke Status Display */}
      <GameStatus />
      {/* Duration Input */}
      <DurationInput />
      {/* Game Control Button */}
      <GameButton />
    </ThemedView>
  );
}
