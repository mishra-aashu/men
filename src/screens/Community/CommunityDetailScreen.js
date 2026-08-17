import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import PostCard from '../../components/post/PostCard';
import EmptyState from '../../components/common/EmptyState';
import { COMMUNITIES } from '../../utils/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CommunityDetailScreen({ route, navigation }) {
  const { communityId } = route.params || {};
  const { colors, typography, spacing } = useTheme();
  const { posts, toggleLikePost, toggleSavePost, joinedCommunityIds, toggleJoinCommunity } = useUser();
  const toast = useToast();

  const [menuVisible, setMenuVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const community = COMMUNITIES.find((c) => c.id === communityId);
  const isJoined = joinedCommunityIds.includes(communityId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setMenuVisible((prev) => !prev)}
          style={{ marginRight: 8, padding: 4 }}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons name="dots-vertical" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  // Filter posts belonging to this community
  const communityPosts = posts.filter(
    (p) => p.category?.toLowerCase() === community?.name.split(' ')[0].toLowerCase()
  );

  if (!community) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Community not found.</Text>
      </View>
    );
  }

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={() => toggleLikePost(item.id)}
      onSave={() => toggleSavePost(item.id)}
      onCommentPress={() => navigation.navigate('ThreadDetail', { postId: item.id })}
      onReportPress={() => toast.success('Post flagged.')}
      onCardPress={() => navigation.navigate('ThreadDetail', { postId: item.id })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Banner */}
      <View style={[styles.banner, { backgroundColor: colors.surface, borderBottomColor: colors.border, padding: spacing.md }]}>
        <Text style={[styles.title, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.lg }]}>
          {community.name}
        </Text>
        <Text style={[styles.description, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm, marginVertical: spacing.xs }]}>
          {community.description}
        </Text>
        {!isJoined && (
          <TouchableOpacity
            style={[styles.joinBtn, { backgroundColor: colors.accent }]}
            onPress={() => {
              toggleJoinCommunity(communityId);
              toast.success(`Joined ${community.name}`);
            }}
          >
            <Text style={[styles.joinBtnText, { color: colors.background, fontFamily: typography.fontFamily.header }]}>
              JOIN CIRCLE
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Feed */}
      <FlatList
        data={communityPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="bulletin-board"
            title="Silence in the Circle"
            message="No posts broadcasted in this community yet."
          />
        }
      />

      {/* Three-dots dropdown menu */}
      {menuVisible && (
        <>
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setMenuVisible(false)}
          />
          <View style={[styles.dropdownMenu, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {isJoined ? (
              <TouchableOpacity
                style={[styles.menuItem, { paddingVertical: spacing.md, paddingHorizontal: spacing.md }]}
                onPress={() => {
                  setMenuVisible(false);
                  toggleJoinCommunity(communityId);
                  toast.success(`Left ${community.name}`);
                }}
              >
                <MaterialCommunityIcons name="circle-off-outline" size={18} color={colors.danger} style={{ marginRight: 12 }} />
                <Text style={{ color: colors.danger, fontFamily: typography.fontFamily.body, fontSize: 13, fontWeight: '600' }}>
                  LEAVE CIRCLE
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.menuItem, { paddingVertical: spacing.md, paddingHorizontal: spacing.md }]}
                onPress={() => {
                  setMenuVisible(false);
                  toggleJoinCommunity(communityId);
                  toast.success(`Joined ${community.name}`);
                }}
              >
                <MaterialCommunityIcons name="plus-circle-outline" size={18} color={colors.accent} style={{ marginRight: 12 }} />
                <Text style={{ color: colors.accent, fontFamily: typography.fontFamily.body, fontSize: 13, fontWeight: '600' }}>
                  JOIN CIRCLE
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.menuItem, { paddingVertical: spacing.md, paddingHorizontal: spacing.md }]}
              onPress={() => {
                setMenuVisible(false);
                setIsMuted(!isMuted);
                toast.success(isMuted ? 'Notifications unmuted' : 'Notifications muted');
              }}
            >
              <MaterialCommunityIcons
                name={isMuted ? 'bell-outline' : 'bell-off-outline'}
                size={18}
                color={colors.textPrimary}
                style={{ marginRight: 12 }}
              />
              <Text style={{ color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13 }}>
                {isMuted ? 'UNMUTE CIRCLE' : 'MUTE CIRCLE'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { paddingVertical: spacing.md, paddingHorizontal: spacing.md }]}
              onPress={() => {
                setMenuVisible(false);
                toast.success('Circle link copied to clipboard.');
              }}
            >
              <MaterialCommunityIcons name="share-variant" size={18} color={colors.textPrimary} style={{ marginRight: 12 }} />
              <Text style={{ color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13 }}>
                SHARE CIRCLE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, { paddingVertical: spacing.md, paddingHorizontal: spacing.md }]}
              onPress={() => {
                setMenuVisible(false);
                toast.success('Circle reported to moderators.');
              }}
            >
              <MaterialCommunityIcons name="flag-outline" size={18} color={colors.danger} style={{ marginRight: 12 }} />
              <Text style={{ color: colors.danger, fontFamily: typography.fontFamily.body, fontSize: 13 }}>
                REPORT CIRCLE
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  banner: {
    borderBottomWidth: 1.5,
  },
  title: {
    fontWeight: '800',
  },
  description: {
    lineHeight: 20,
  },
  joinBtn: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  joinBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  dropdownMenu: {
    position: 'absolute',
    top: 12,
    right: 16,
    width: 200,
    borderRadius: 8,
    borderWidth: 1,
    zIndex: 1000,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
