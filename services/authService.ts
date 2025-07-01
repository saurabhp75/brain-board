import { Platform } from 'react-native';
import { useAuthStore } from '@/stores/authStore';

export class AuthService {
  static async signInWithGoogle() {
    const { setLoading, setError, signIn } = useAuthStore.getState();
    
    try {
      setLoading(true);
      
      // For demo purposes, simulate Google sign-in
      await this.simulateGoogleSignIn();
    } catch (error) {
      console.error('Sign in error:', error);
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  private static async simulateGoogleSignIn() {
    const { signIn } = useAuthStore.getState();
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock user data
    const mockUser = {
      id: 'demo-user-123',
      email: 'demo@example.com',
      name: 'Demo Player',
      picture: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop&crop=face',
    };
    
    signIn(mockUser);
  }

  static async signOut() {
    const { signOut } = useAuthStore.getState();
    
    try {
      // Perform any cleanup
      signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }
}