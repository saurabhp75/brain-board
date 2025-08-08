import { MMKV } from 'react-native-mmkv';

// Single MMKV instance for the app
export const mmkv = new MMKV({ id: 'brain-board' });

// Minimal sync storage adapter for zustand's createJSONStorage
export const mmkvStorage = {
  getItem: (name: string): string | null => {
    try {
      const value = mmkv.getString(name);
      return value ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    mmkv.set(name, value);
  },
  removeItem: (name: string): void => {
    mmkv.delete(name);
  },
};

export type MMKVStorage = typeof mmkvStorage;
