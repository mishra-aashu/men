import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import InputField from '../../components/common/InputField';
import PostCard from '../../components/post/PostCard';
import EmptyState from '../../components/common/EmptyState';

export default function SearchScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { posts, toggleLikePost, toggleSavePost } = useUser();
  const toast = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.content.toLowerCase().includes(query) ||
      post.category?.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });

  const renderPost = ({ item }) => (
    <PostCard
      post={item}
      onLike={() => toggleLikePost(item.id)}
      onSave={() => toggleSavePost(item.id)}
      onCommentPress={() => navigation.navigate('PostDetail', { postId: item.id })}
      onReportPress={() => toast.success('Post reported.')}
      onCardPress={() => navigation.navigate('PostDetail', { postId: item.id })}
    />
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <InputField
        placeholder="Search keywords, topics or nicknames..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoFocus
      />

      <FlatList
        data={searchQuery ? filteredPosts : []}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingBottom: spacing.xl }}
        ListEmptyComponent={
          searchQuery ? (
            <EmptyState
              icon="magnify-close"
              title="No Logs Match"
              message="Try looking up other keywords."
            />
          ) : (
            <EmptyState
              icon="search-web"
              title="Search the Feed"
              message="Start typing to lookup posts, advice, and topics."
            />
          )
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
