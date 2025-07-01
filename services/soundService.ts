import { Audio } from 'expo-av';
import { Platform } from 'react-native';

export class SoundService {
  private static correctSound: Audio.Sound | null = null;
  private static errorSound: Audio.Sound | null = null;
  private static victorySound: Audio.Sound | null = null;
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;

    try {
      if (Platform.OS !== 'web') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      }

      this.correctSound = await this.loadSound(
        require('@/assets/sounds/correct.mp3')
      );
      this.errorSound = await this.loadSound(require('@/assets/sounds/error.mp3'));
      this.victorySound = await this.loadSound(
        require('@/assets/sounds/victory.mp3')
      );

      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound service:', error);
    }
  }

  private static async loadSound(asset: number): Promise<Audio.Sound | null> {
    try {
      const { sound } = await Audio.Sound.createAsync(asset);
      return sound;
    } catch (error) {
      console.warn('Failed to load sound:', error);
      return null;
    }
  }

  static async playCorrectSound() {
    await this.playSound(this.correctSound, 0.4);
  }

  static async playErrorSound() {
    await this.playSound(this.errorSound, 0.4);
  }

  static async playVictorySound() {
    await this.playSound(this.victorySound, 0.6);
  }

  private static async playSound(sound: Audio.Sound | null, volume: number) {
    if (!sound) return;
    try {
      await sound.setPositionAsync(0);
      await sound.setVolumeAsync(volume);
      await sound.playAsync();
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }

  static async cleanup() {
    try {
      await this.correctSound?.unloadAsync();
      await this.errorSound?.unloadAsync();
      await this.victorySound?.unloadAsync();
      this.correctSound = null;
      this.errorSound = null;
      this.victorySound = null;
      this.isInitialized = false;
    } catch (error) {
      console.warn('Error cleaning up sounds:', error);
    }
  }
}
