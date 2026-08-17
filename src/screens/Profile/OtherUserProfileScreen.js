import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../../components/common/Avatar';
import StreakBadge from '../../components/moodcheckin/StreakBadge';
import PostCard from '../../components/post/PostCard';
import EmptyState from '../../components/common/EmptyState';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getBioForUser = (username) => {
  switch (username) {
    case 'Bruce_93':
      return 'Focus on your craft, block out the noise, and rise from the ashes. Here to support my brothers.';
    case 'SilentGideon':
      return 'Fatherhood and family. Finding strength in silence and leadership. Stronger together.';
    case 'Anonymous Bat':
      return 'Watching the city. Carrying weights in silence. There is always a way out.';
    case 'SolidGrit_45':
      return 'Consistent effort yields solid grit. Helping others push through their dark phases.';
    case 'SolidBrother':
      return 'Always here with an open ear. Brotherhood is about standing tall together.';
    case 'IronGrip_92':
      return 'Discipline, weights, and high standards. Keep pushing, never give up.';
    case 'MentorAurelius':
      return 'Stoic perspectives on modern challenges. Focus on what you can control.';
    default:
      return 'Pseudonymous member of Men Are Brave. Striving for mental resilience, discipline, and brotherhood.';
  }
};

export default function OtherUserProfileScreen({ route, navigation }) {
  const { username = 'Brother Knight', avatar = 'ninja' } = route.params || {};
  const { colors, typography, spacing } = useTheme();
  const { posts, toggleLikePost, toggleSavePost } = useUser();
  const toast = useToast();
  const insets = useSafeAreaInsets();

  const [activeTab, setActiveTab] = useState('posts'); // 'posts' or 'about'

  // Hide the default navigator header since we render a custom translucent one
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  // Filter posts belonging to this user
  const userPosts = posts.filter((p) => p.author === username);
  
  // Calculate stats
  const streak = username === 'Bruce_93' ? 8 : (username === 'SilentGideon' ? 5 : 3);
  const bio = getBioForUser(username);

  const renderHeader = () => (
    <View style={{ backgroundColor: colors.background }}>
      {/* Cover / Cover Banner (Reddit-style Gradient Cover) */}
      <LinearGradient
        colors={[colors.surfaceLight, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.coverGradient}
      />

      {/* Profile Details Area */}
      <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.sm }}>
        {/* Avatar Overlay */}
        <View style={styles.profileRow}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.background, borderColor: colors.background }]}>
            <Avatar type={avatar} size={80} />
          </View>
        </View>

        {/* Username, Role and Status Indicator */}
        <View style={{ marginTop: spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={[styles.username, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.xl }]}>
              {username}
            </Text>
            <View style={[styles.roleBadge, { backgroundColor: colors.yellowMuted, borderColor: colors.accent }]}>
              <Text style={[styles.roleBadgeText, { color: colors.accent, fontFamily: typography.fontFamily.header }]}>
                BROTHER
              </Text>
            </View>
          </View>
          
          <Text style={[styles.handleText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 12, marginTop: 2 }]}>
            u/{username.toLowerCase().replace(/[^a-z0-9]/g, '')} • Shield Active
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={[styles.statsContainer, { borderColor: colors.border }]}>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: colors.textPrimary, fontFamily: typography.fontFamily.header }]}>
              {userPosts.length}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: typography.fontFamily.body }]}>
              Logs
            </Text>
          </View>
          <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
          <View style={styles.statBox}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialCommunityIcons name="fire" size={18} color="#FFD100" />
              <Text style={[styles.statValue, { color: colors.textPrimary, fontFamily: typography.fontFamily.header }]}>
                {streak}
              </Text>
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: typography.fontFamily.body }]}>
              Day Streak
            </Text>
          </View>
        </View>

        {/* Custom Tabs Bar */}
        <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'posts' && { borderBottomColor: colors.accent, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'posts' ? colors.textPrimary : colors.textSecondary, fontFamily: typography.fontFamily.header }]}>
              POSTS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabItem, activeTab === 'about' && { borderBottomColor: colors.accent, borderBottomWidth: 2 }]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[styles.tabText, { color: activeTab === 'about' ? colors.textPrimary : colors.textSecondary, fontFamily: typography.fontFamily.header }]}>
              ABOUT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEmptyOrAbout = () => {
    if (activeTab === 'posts') {
      return (
        <EmptyState
          icon="bulletin-board"
          title="Silence in the logs"
          message={`No posts broadcasted by ${username} yet.`}
        />
      );
    }

    // Render ABOUT Tab Contents
    return (
      <View style={[styles.aboutContainer, { paddingHorizontal: spacing.md }]}>
        {/* Biography Card */}
        <View style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.aboutTitle, { color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: 13, marginBottom: spacing.sm }]}>
            BIOGRAPHY
          </Text>
          <Text style={[styles.aboutText, { color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13, lineHeight: 20 }]}>
            "{bio}"
          </Text>
        </View>

        {/* Security / Shield details */}
        <View style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: spacing.md }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs }}>
            <MaterialCommunityIcons name="shield-check" size={18} color={colors.success} style={{ marginRight: 6 }} />
            <Text style={[styles.aboutTitle, { color: colors.success, fontFamily: typography.fontFamily.header, fontSize: 13 }]}>
              SANCTITY SHIELD ACTIVE
            </Text>
          </View>
          <Text style={[styles.aboutText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 12, lineHeight: 18 }]}>
            This member is browsing in pseudonymous shield mode. Complete IP logs, device details, and personal identity are encrypted and hidden to preserve the sanctity and privacy of the feed.
          </Text>
        </View>

        {/* Achievement Badges */}
        <View style={[styles.aboutCard, { backgroundColor: colors.surface, borderColor: colors.border, marginTop: spacing.md, marginBottom: spacing.lg }]}>
          <Text style={[styles.aboutTitle, { color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: 13, marginBottom: spacing.sm }]}>
            CIRCLES ACHIEVEMENTS
          </Text>
          <View style={styles.badgeRow}>
            <View style={[styles.badgeItem, { backgroundColor: colors.surfaceLight }]}>
              <MaterialCommunityIcons name="shield-crown" size={16} color={colors.accent} />
              <Text style={[styles.badgeText, { color: colors.textPrimary, fontFamily: typography.fontFamily.body }]}>
                Brave Protector
              </Text>
            </View>
            <View style={[styles.badgeItem, { backgroundColor: colors.surfaceLight }]}>
              <MaterialCommunityIcons name="fire" size={16} color="#FFD100" />
              <Text style={[styles.badgeText, { color: colors.textPrimary, fontFamily: typography.fontFamily.body }]}>
                Consistent Vibe
              </Text>
            </View>
            <View style={[styles.badgeItem, { backgroundColor: colors.surfaceLight }]}>
              <MaterialCommunityIcons name="heart-pulse" size={16} color={colors.danger} />
              <Text style={[styles.badgeText, { color: colors.textPrimary, fontFamily: typography.fontFamily.body }]}>
                Vibe Checker
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Overlaid Translucent Back Button Header */}
      <View style={[styles.customHeader, { top: insets.top || 16 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerCircleBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* Main Scrollable Content */}
      <FlatList
        data={activeTab === 'posts' ? userPosts : []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: spacing.md, paddingBottom: spacing.sm }}>
            <PostCard
              post={item}
              onLike={() => toggleLikePost(item.id)}
              onSave={() => toggleSavePost(item.id)}
              onCommentPress={() => navigation.navigate('PostDetail', { postId: item.id })}
              onReportPress={() => toast.success('Post reported.')}
              onCardPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            />
          </View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyOrAbout}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverGradient: {
    width: '100%',
    height: 120,
  },
  customHeader: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
  },
  headerCircleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
  },
  avatarContainer: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -43,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  username: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  roleBadge: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  roleBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  handleText: {
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
    marginTop: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 16,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  aboutContainer: {
    marginTop: 16,
    width: '100%',
  },
  aboutCard: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  aboutTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  aboutText: {
    lineHeight: 18,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  badgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
