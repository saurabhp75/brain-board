import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy, Clock, Target, Medal, Crown, Award } from 'lucide-react-native';
import { useAuthStore } from '@/stores/authStore';
import { useGameStore } from '@/stores/gameStore';

interface LeaderboardEntry {
  id: string;
  name: string;
  bestTime: number;
  gamesWon: number;
  winRate: number;
  totalScore: number;
  rank: number;
}

type SortType = 'bestTime' | 'gamesWon' | 'winRate' | 'totalScore';

export default function LeaderboardScreen() {
  const { user } = useAuthStore();
  const { bestTime, gamesWon, gamesPlayed, score } = useGameStore();
  const [sortBy, setSortBy] = useState<SortType>('bestTime');
  const [refreshing, setRefreshing] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  // Mock leaderboard data for demonstration
  const generateMockLeaderboard = (): LeaderboardEntry[] => {
    const mockData: LeaderboardEntry[] = [
      {
        id: 'player1',
        name: 'Memory Master',
        bestTime: 18500,
        gamesWon: 25,
        winRate: 92.6,
        totalScore: 24500,
        rank: 1,
      },
      {
        id: 'player2',
        name: 'Speed Demon',
        bestTime: 21200,
        gamesWon: 18,
        winRate: 85.7,
        totalScore: 19800,
        rank: 2,
      },
      {
        id: 'player3', 
        name: 'Brain Trainer',
        bestTime: 23700,
        gamesWon: 22,
        winRate: 81.5,
        totalScore: 18900,
        rank: 3,
      },
      {
        id: 'player4',
        name: 'Quick Thinker',
        bestTime: 25100,
        gamesWon: 15,
        winRate: 78.9,
        totalScore: 16750,
        rank: 4,
      },
      {
        id: 'player5',
        name: 'Puzzle Pro',
        bestTime: 27300,
        gamesWon: 20,
        winRate: 76.9,
        totalScore: 15600,
        rank: 5,
      },
    ];

    // Add current user if signed in and has played games
    if (user && gamesWon > 0) {
      const userEntry: LeaderboardEntry = {
        id: user.id,
        name: user.name,
        bestTime: bestTime || 99999,
        gamesWon,
        winRate: gamesPlayed > 0 ? (gamesWon / gamesPlayed) * 100 : 0,
        totalScore: score || 0,
        rank: 0, // Will be calculated
      };
      
      mockData.push(userEntry);
    }

    return mockData.sort((a, b) => {
      switch (sortBy) {
        case 'bestTime':
          return a.bestTime - b.bestTime;
        case 'gamesWon':
          return b.gamesWon - a.gamesWon;
        case 'winRate':
          return b.winRate - a.winRate;
        case 'totalScore':
          return b.totalScore - a.totalScore;
        default:
          return a.bestTime - b.bestTime;
      }
    }).map((entry, index) => ({ ...entry, rank: index + 1 }));
  };

  useEffect(() => {
    setLeaderboardData(generateMockLeaderboard());
  }, [sortBy, user, bestTime, gamesWon, gamesPlayed, score]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate network request
    setTimeout(() => {
      setLeaderboardData(generateMockLeaderboard());
      setRefreshing(false);
    }, 1000);
  };

  const formatTime = (ms: number) => {
    return `${(ms / 1000).toFixed(1)}s`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown color="#ffd700" size={20} />;
      case 2:
        return <Medal color="#c0c0c0" size={20} />;
      case 3:
        return <Award color="#cd7f32" size={20} />;
      default:
        return <Text style={styles.rankNumber}>{rank}</Text>;
    }
  };

  const getSortButtonStyle = (type: SortType) => [
    styles.sortButton,
    sortBy === type && styles.sortButtonActive,
  ];

  const getSortButtonTextStyle = (type: SortType) => [
    styles.sortButtonText,
    sortBy === type && styles.sortButtonTextActive,
  ];

  const renderLeaderboardEntry = (entry: LeaderboardEntry, index: number) => {
    const isCurrentUser = user && entry.id === user.id;
    
    return (
      <View 
        key={entry.id} 
        style={[
          styles.leaderboardEntry,
          isCurrentUser && styles.currentUserEntry,
          index < 3 && styles.topThreeEntry,
        ]}
      >
        <View style={styles.rankContainer}>
          {getRankIcon(entry.rank)}
        </View>
        
        <View style={styles.playerInfo}>
          <Text style={[
            styles.playerName,
            isCurrentUser && styles.currentUserName
          ]}>
            {entry.name}
            {isCurrentUser && ' (You)'}
          </Text>
          <View style={styles.playerStats}>
            <Text style={styles.statText}>
              ⏱️ {formatTime(entry.bestTime)}
            </Text>
            <Text style={styles.statText}>
              🏆 {entry.gamesWon} wins
            </Text>
            <Text style={styles.statText}>
              📊 {entry.winRate.toFixed(1)}%
            </Text>
          </View>
        </View>
        
        <View style={styles.scoreContainer}>
          <Text style={styles.totalScore}>{entry.totalScore}</Text>
          <Text style={styles.scoreLabel}>Score</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Trophy color="#3b82f6" size={32} />
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>
            Compete with players worldwide
          </Text>
        </View>

        {/* Sort Options */}
        <View style={styles.sortContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sortScrollContent}
          >
            <TouchableOpacity
              style={getSortButtonStyle('bestTime')}
              onPress={() => setSortBy('bestTime')}
            >
              <Clock size={16} color={sortBy === 'bestTime' ? '#ffffff' : '#6b7280'} />
              <Text style={getSortButtonTextStyle('bestTime')}>Best Time</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={getSortButtonStyle('gamesWon')}
              onPress={() => setSortBy('gamesWon')}
            >
              <Trophy size={16} color={sortBy === 'gamesWon' ? '#ffffff' : '#6b7280'} />
              <Text style={getSortButtonTextStyle('gamesWon')}>Games Won</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={getSortButtonStyle('winRate')}
              onPress={() => setSortBy('winRate')}
            >
              <Target size={16} color={sortBy === 'winRate' ? '#ffffff' : '#6b7280'} />
              <Text style={getSortButtonTextStyle('winRate')}>Win Rate</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={getSortButtonStyle('totalScore')}
              onPress={() => setSortBy('totalScore')}
            >
              <Award size={16} color={sortBy === 'totalScore' ? '#ffffff' : '#6b7280'} />
              <Text style={getSortButtonTextStyle('totalScore')}>Total Score</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Leaderboard List */}
        <ScrollView
          style={styles.leaderboardContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
        >
          {leaderboardData.length > 0 ? (
            leaderboardData.map((entry, index) => renderLeaderboardEntry(entry, index))
          ) : (
            <View style={styles.emptyState}>
              <Trophy color="#9ca3af" size={48} />
              <Text style={styles.emptyStateText}>No leaderboard data yet</Text>
              <Text style={styles.emptyStateSubtext}>
                Play some games to see rankings!
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Info Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎯 Rankings update in real-time • Pull to refresh
          </Text>
        </View>
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
  header: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 8,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sortScrollContent: {
    gap: 8,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    gap: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  sortButtonActive: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  sortButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  sortButtonTextActive: {
    color: '#ffffff',
  },
  leaderboardContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  leaderboardEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  topThreeEntry: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  currentUserEntry: {
    backgroundColor: '#f0f9ff',
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b7280',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  currentUserName: {
    color: '#3b82f6',
  },
  playerStats: {
    flexDirection: 'row',
    gap: 12,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  totalScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
});