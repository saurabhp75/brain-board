import { Platform } from 'react-native';

export class SoundService {
  private static correctSound: HTMLAudioElement | null = null;
  private static errorSound: HTMLAudioElement | null = null;
  private static victorySound: HTMLAudioElement | null = null;
  private static isInitialized = false;

  static initialize() {
    if (Platform.OS !== 'web' || this.isInitialized) return;

    try {
      // Create audio elements for web
      this.correctSound = new Audio();
      this.errorSound = new Audio();
      this.victorySound = new Audio();

      // Generate sounds
      this.correctSound.src = this.generateCorrectSound();
      this.errorSound.src = this.generateErrorSound();
      this.victorySound.src = this.generateVictorySound();

      // Preload the sounds
      this.correctSound.load();
      this.errorSound.load();
      this.victorySound.load();

      this.isInitialized = true;
    } catch (error) {
      console.warn('Failed to initialize sound service:', error);
    }
  }

  private static generateCorrectSound(): string {
    // Generate a happy success sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
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

  private static generateVictorySound(): string {
    // Generate an epic victory fanfare sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    const duration = 2.0; // 2 seconds for a proper celebration
    const buffer = audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    // Victory fanfare sequence - classic "ta-da!" progression
    const notes = [
      { freq: 523.25, start: 0.0, end: 0.3 },   // C5
      { freq: 659.25, start: 0.1, end: 0.4 },   // E5
      { freq: 783.99, start: 0.2, end: 0.5 },   // G5
      { freq: 1046.5, start: 0.3, end: 0.8 },   // C6 (octave)
      { freq: 1318.5, start: 0.5, end: 1.2 },   // E6
      { freq: 1568.0, start: 0.7, end: 1.5 },   // G6
      { freq: 2093.0, start: 0.9, end: 2.0 },   // C7 (final high note)
    ];

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      let sample = 0;

      // Layer multiple notes for rich harmony
      for (const note of notes) {
        if (t >= note.start && t <= note.end) {
          const noteProgress = (t - note.start) / (note.end - note.start);
          
          // Main tone
          const mainTone = Math.sin(2 * Math.PI * note.freq * t);
          
          // Add harmonics for richness
          const harmonic2 = Math.sin(2 * Math.PI * note.freq * 2 * t) * 0.3;
          const harmonic3 = Math.sin(2 * Math.PI * note.freq * 3 * t) * 0.1;
          
          // Create envelope for each note
          let envelope;
          if (noteProgress < 0.1) {
            // Attack
            envelope = noteProgress / 0.1;
          } else if (noteProgress < 0.7) {
            // Sustain
            envelope = 1.0;
          } else {
            // Release
            envelope = (1.0 - noteProgress) / 0.3;
          }
          
          // Add some tremolo for excitement
          const tremolo = 1 + 0.1 * Math.sin(2 * Math.PI * 6 * t);
          
          sample += (mainTone + harmonic2 + harmonic3) * envelope * tremolo * 0.15;
        }
      }

      // Apply master envelope for the entire sound
      const masterEnvelope = Math.min(1, Math.exp(-t * 0.5));
      data[i] = Math.max(-1, Math.min(1, sample * masterEnvelope));
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

  static playVictorySound() {
    if (Platform.OS !== 'web') return;

    try {
      if (this.victorySound) {
        this.victorySound.currentTime = 0;
        this.victorySound.volume = 0.6; // Slightly louder for celebration
        this.victorySound.play().catch(e => console.warn('Failed to play victory sound:', e));
      }
    } catch (error) {
      console.warn('Error playing victory sound:', error);
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
      if (this.victorySound?.src) {
        URL.revokeObjectURL(this.victorySound.src);
      }
      this.correctSound = null;
      this.errorSound = null;
      this.victorySound = null;
      this.isInitialized = false;
    } catch (error) {
      console.warn('Error cleaning up sounds:', error);
    }
  }
}