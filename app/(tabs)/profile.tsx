import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LogIn, LogOut, Trophy, Clock, Target, Award } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';
import { AuthService } from '@/services/authService';

export default function ProfileScreen() {
  const { user, isLoading } = useAuthStore();
  const { 
    bestTime, 
    gamesPlayed, 
    gamesWon, 
    score: currentScore 
  } = useGameStore();

  const handleSignIn = async () => {
    try {
      await AuthService.signInWithGoogle();
    } catch (error) {
      Alert.alert('Sign In Error', 'Failed to sign in. Please try again.');
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: () => AuthService.signOut()
        },
      ]
    );
  };

  const formatTime = (ms: number | null) => {
    if (!ms) return 'N/A';
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const winRate = gamesPlayed > 0 ? ((gamesWon / gamesPlayed) * 100).toFixed(1) : '0';

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
          style={styles.gradient}
        >
          <View style={styles.authContainer}>
            <View style={styles.authCard}>
              <Trophy color="#3b82f6" size={64} />
              <Text style={styles.authTitle}>Memory Game Pro</Text>
              <Text style={styles.authSubtitle}>
                Sign in to track your progress and compete on the leaderboard
              </Text>
              
              <TouchableOpacity
                style={[
                  styles.signInButton,
                  isLoading && styles.signInButtonDisabled
                ]}
                onPress={handleSignIn}
                disabled={isLoading}
              >
                <LogIn color="#ffffff" size={20} />
                <Text style={styles.signInButtonText}>
                  {isLoading ? 'Signing In...' : 'Sign In with Google'}
                </Text>
              </TouchableOpacity>

              <Text style={styles.authFooter}>
                Your stats and progress will be saved to your account
              </Text>
            </View>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
        style={styles.gradient}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              {user.picture ? (
                <Image source={{ uri: user.picture }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
          </View>

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Target color="#3b82f6" size={24} />
                <Text style={styles.statValue}>{gamesPlayed}</Text>
                <Text style={styles.statLabel}>Games Played</Text>
              </View>
              
              <View style={styles.statCard}>
                <Trophy color="#10b981" size={24} />
                <Text style={styles.statValue}>{gamesWon}</Text>
                <Text style={styles.statLabel}>Games Won</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Clock color="#f59e0b" size={24} />
                <Text style={styles.statValue}>{formatTime(bestTime)}</Text>
                <Text style={styles.statLabel}>Best Time</Text>
              </View>
              
              <View style={styles.statCard}>
                <Award color="#8b5cf6" size={24} />
                <Text style={styles.statValue}>{winRate}%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>
            </View>
          </View>

          {/* Current Score */}
          {currentScore > 0 && (
            <View style={styles.currentScoreCard}>
              <Text style={styles.currentScoreTitle}>Latest Score</Text>
              <Text style={styles.currentScoreValue}>{currentScore}</Text>
            </View>
          )}

          {/* Achievements Section */}
          <View style={styles.achievementsContainer}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.achievementsList}>
              <View style={[
                styles.achievementItem,
                gamesWon >= 1 && styles.achievementUnlocked
              ]}>
                <Trophy 
                  color={gamesWon >= 1 ? '#10b981' : '#9ca3af'} 
                  size={20} 
                />
                <Text style={[
                  styles.achievementText,
                  gamesWon >= 1 && styles.achievementTextUnlocked
                ]}>
                  First Victory
                </Text>
              </View>

              <View style={[
                styles.achievementItem,
                gamesWon >= 5 && styles.achievementUnlocked
              ]}>
                <Award 
                  color={gamesWon >= 5 ? '#10b981' : '#9ca3af'} 
                  size={20} 
                />
                <Text style={[
                  styles.achievementText,
                  gamesWon >= 5 && styles.achievementTextUnlocked
                ]}>
                  Memory Master (5 wins)
                </Text>
              </View>

              <View style={[
                styles.achievementItem,
                bestTime && bestTime < 30000 && styles.achievementUnlocked
              ]}>
                <Clock 
                  color={bestTime && bestTime < 30000 ? '#10b981' : '#9ca3af'} 
                  size={20} 
                />
                <Text style={[
                  styles.achievementText,
                  bestTime && bestTime < 30000 && styles.achievementTextUnlocked
                ]}>
                  Speed Demon (Under 30s)
                </Text>
              </View>
            </View>
          </View>

          {/* Sign Out Button */}
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <LogOut color="#ef4444" size={20} />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  authCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    maxWidth: 350,
    width: '100%',
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  signInButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
    width: '100%',
  },
  signInButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  signInButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  authFooter: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 16,
  },
  profileHeader: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 30,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  currentScoreCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentScoreTitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 8,
  },
  currentScoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  achievementsContainer: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    gap: 12,
  },
  achievementUnlocked: {
    backgroundColor: '#ecfdf5',
  },
  achievementText: {
    fontSize: 14,
    color: '#6b7280',
  },
  achievementTextUnlocked: {
    color: '#059669',
    fontWeight: '500',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  signOutButtonText: {
    color: '#ef4444',
    fontSize: 16,
    fontWeight: '500',
  },
});