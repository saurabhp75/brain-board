import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  signIn: (user: User) => void;
  signOut: () => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  
  signIn: (user: User) => {
    set({ user, isLoading: false, error: null });
  },
  
  signOut: () => {
    set({ user: null, isLoading: false, error: null });
  },
  
  clearError: () => {
    set({ error: null });
  },
  
  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },
  
  setError: (error: string) => {
    set({ error, isLoading: false });
  },
}));