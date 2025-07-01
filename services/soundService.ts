import { Platform } from 'react-native';

export class SoundService {
  private static correctSound: HTMLAudioElement | null = null;
  private static errorSound: HTMLAudioElement | null = null;
  private static isInitialized = false;

  static initialize() {
    if (Platform.OS !== 'web' || this.isInitialized) return;

    try {
      // Create audio elements for web
      this.correctSound = new Audio();
      this.errorSound = new Audio();

      // Generate correct sound (happy beep)
      this.correctSound.src = this.generateCorrectSound();
      this.errorSound.src = this.generateErrorSound();

      // Preload the sounds
      this.correctSound.load();
      this.errorSound.load();

      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound service:', error);
    }
  }

  private static generateCorrectSound(): string {
    // Generate a happy success sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Create a buffer for the sound
    const sampleRate = audioContext.sampleRate;
    const duration = 0.3; // 300ms
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate a pleasant ascending tone sequence
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency1 = 523.25; // C5
      const frequency2 = 659.25; // E5
      const frequency3 = 783.99; // G5
      
      let sample = 0;
      if (t < 0.1) {
        sample = Math.sin(2 * Math.PI * frequency1 * t);
      } else if (t < 0.2) {
        sample = Math.sin(2 * Math.PI * frequency2 * t);
      } else {
        sample = Math.sin(2 * Math.PI * frequency3 * t);
      }
      
      // Apply envelope (fade in/out)
      const envelope = Math.sin(Math.PI * t / duration);
      data[i] = sample * envelope * 0.3;
    }

    // Convert buffer to data URL
    const offlineContext = new OfflineAudioContext(1, buffer.length, sampleRate);
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    source.connect(offlineContext.destination);
    source.start();

    return this.bufferToDataURL(buffer, sampleRate);
  }

  private static generateErrorSound(): string {
    // Generate a sad error sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const duration = 0.4; // 400ms
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    // Generate a descending tone sequence (sad sound)
    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const frequency1 = 349.23; // F4
      const frequency2 = 293.66; // D4
      const frequency3 = 261.63; // C4
      
      let sample = 0;
      if (t < 0.133) {
        sample = Math.sin(2 * Math.PI * frequency1 * t);
      } else if (t < 0.266) {
        sample = Math.sin(2 * Math.PI * frequency2 * t);
      } else {
        sample = Math.sin(2 * Math.PI * frequency3 * t);
      }
      
      // Apply envelope with longer decay
      const envelope = Math.exp(-t * 3) * Math.sin(Math.PI * t / duration);
      data[i] = sample * envelope * 0.3;
    }

    return this.bufferToDataURL(buffer, sampleRate);
  }

  private static bufferToDataURL(buffer: AudioBuffer, sampleRate: number): string {
    // Convert AudioBuffer to WAV data URL
    const length = buffer.length;
    const arrayBuffer = new ArrayBuffer(44 + length * 2);
    const view = new DataView(arrayBuffer);
    const data = buffer.getChannelData(0);

    // WAV header
    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + length * 2, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, length * 2, true);

    // Convert float samples to 16-bit PCM
    let offset = 44;
    for (let i = 0; i < length; i++) {
      const sample = Math.max(-1, Math.min(1, data[i]));
      view.setInt16(offset, sample * 0x7FFF, true);
      offset += 2;
    }

    const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
    return URL.createObjectURL(blob);
  }

  static playCorrectSound() {
    if (Platform.OS !== 'web') return;

    try {
      if (this.correctSound) {
        this.correctSound.currentTime = 0;
        this.correctSound.volume = 0.4;
        this.correctSound.play().catch(e => console.warn('Failed to play correct sound:', e));
      }
    } catch (error) {
      console.warn('Error playing correct sound:', error);
    }
  }

  static playErrorSound() {
    if (Platform.OS !== 'web') return;

    try {
      if (this.errorSound) {
        this.errorSound.currentTime = 0;
        this.errorSound.volume = 0.4;
        this.errorSound.play().catch(e => console.warn('Failed to play error sound:', e));
      }
    } catch (error) {
      console.warn('Error playing error sound:', error);
    }
  }

  static cleanup() {
    if (Platform.OS !== 'web') return;

    try {
      if (this.correctSound?.src) {
        URL.revokeObjectURL(this.correctSound.src);
      }
      if (this.errorSound?.src) {
        URL.revokeObjectURL(this.errorSound.src);
      }
      this.correctSound = null;
      this.errorSound = null;
      this.isInitialized = false;
    } catch (error) {
      console.warn('Error cleaning up sounds:', error);
    }
  }
}