import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import PostCard from '../../components/post/PostCard';
import EmptyState from '../../components/common/EmptyState';
import { COMMUNITIES } from '../../utils/constants';

export default function CommunityDetailScreen({ route, navigation }) {
  const { communityId } = route.params || {};
  const { colors, typography, spacing } = useTheme();
  const { posts, toggleLikePost, toggleSavePost, joinedCommunityIds, toggleJoinCommunity } = useUser();

  const community = COMMUNITIES.find((c) => c.id === communityId);
  const isJoined = joinedCommunityIds.includes(communityId);

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
      onReportPress={() => alert('Post flagged.')}
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
        <TouchableOpacity
          style={[styles.joinBtn, { backgroundColor: isJoined ? colors.surfaceLight : colors.accent }]}
          onPress={() => toggleJoinCommunity(communityId)}
        >
          <Text style={[styles.joinBtnText, { color: isJoined ? colors.textPrimary : colors.background, fontFamily: typography.fontFamily.header }]}>
            {isJoined ? 'LEAVE CIRCLE' : 'JOIN CIRCLE'}
          </Text>
        </TouchableOpacity>
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
});
