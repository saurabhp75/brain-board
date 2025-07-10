import { createAudioPlayer, AudioPlayer } from 'expo-audio';
const correctSound = require('@/assets/sounds/correct.mp3');
const errorSound = require('@/assets/sounds/error.mp3');
const victorySound = require('@/assets/sounds/victory.mp3');

export class SoundService {
  private static correctSound: AudioPlayer | null = null;
  private static errorSound: AudioPlayer | null = null;
  private static victorySound: AudioPlayer | null = null;
  private static isInitialized = false;

  static async initialize() {
    if (this.isInitialized) return;

    try {
      // Audio mode is handled automatically by expo-audio
      this.correctSound = createAudioPlayer(correctSound);
      this.errorSound = createAudioPlayer(errorSound);
      this.victorySound = createAudioPlayer(victorySound);

      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound service:', error);
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

  private static async playSound(sound: AudioPlayer | null, volume: number) {
    if (!sound) return;
    try {
      sound.volume = volume;
      await sound.seekTo(0);
      sound.play();
    } catch (error: any) {
      console.warn('Error playing sound:', error);
    }
  }

  static cleanup() {
    try {
      this.correctSound?.release();
      this.errorSound?.release();
      this.victorySound?.release();
      this.correctSound = null;
      this.errorSound = null;
      this.victorySound = null;
      this.isInitialized = false;
    } catch (error) {
      console.warn('Error cleaning up sounds:', error);
    }
  }
}
