import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import PostCard from '../../components/post/PostCard';
import EmptyState from '../../components/common/EmptyState';

export default function SavedPostsScreen({ navigation }) {
  const { colors, spacing } = useTheme();
  const { posts, savedPostIds, toggleLikePost, toggleSavePost } = useUser();

  // Filter posts that are in savedPostIds list
  const savedPosts = posts.filter((post) => savedPostIds.includes(post.id));

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={() => toggleLikePost(item.id)}
      onSave={() => toggleSavePost(item.id)}
      onCommentPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      onReportPress={() => alert('Post reported.')}
      onCardPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={savedPosts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="bookmark-outline"
            title="No Saved Logs"
            message="Logs you bookmark will appear here."
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
});
