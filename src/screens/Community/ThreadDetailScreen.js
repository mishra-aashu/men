import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import PostCard from '../../components/post/PostCard';
import CommentItem from '../../components/post/CommentItem';
import InputField from '../../components/common/InputField';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ThreadDetailScreen({ route, navigation }) {
  const { postId } = route.params || {};
  const { colors, typography, spacing } = useTheme();
  const { posts, toggleLikePost, toggleSavePost } = useUser();

  const post = posts.find((p) => p.id === postId);

  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { id: 'th1', author: 'IronGrip_92', timestamp: '2h ago', content: 'Consistency is key. Never let the gym down.', replies: [] },
    { id: 'th2', author: 'MentorAurelius', timestamp: '1h ago', content: 'Focus on things under your control. The rest is noise.', replies: [] },
  ]);
  const [replyToComment, setReplyToComment] = useState(null);

  if (!post) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.textPrimary }}>Thread not found.</Text>
      </View>
    );
  }

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    if (replyToComment) {
      // Add nested reply
      const newReply = {
        id: `r_${Date.now()}`,
        author: 'Anonymous Member',
        timestamp: 'Just now',
        content: commentText,
      };
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyToComment.id
            ? { ...c, replies: [...(c.replies || []), newReply] }
            : c
        )
      );
      setReplyToComment(null);
    } else {
      // Add root level comment
      const newComment = {
        id: `thc_${Date.now()}`,
        author: 'Anonymous Member',
        timestamp: 'Just now',
        content: commentText,
        replies: [],
      };
      setComments((prev) => [...prev, newComment]);
    }
    setCommentText('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <PostCard
          post={post}
          onLike={() => toggleLikePost(post.id)}
          onSave={() => toggleSavePost(post.id)}
          onCommentPress={() => {}}
          onReportPress={() => alert('Flagged.')}
        />

        <Text style={[styles.sectionTitle, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.md,
          marginTop: spacing.md,
          marginBottom: spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }]}>
          CIRCLE THREAD ({comments.length})
        </Text>

        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CommentItem
              comment={item}
              onReply={(c) => setReplyToComment(c)}
            />
          )}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Reply Banner Indicator */}
      {replyToComment && (
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: colors.surfaceLight,
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.sm,
          borderTopWidth: 1,
          borderTopColor: colors.border,
        }}>
          <Text style={{ color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 12 }}>
            Replying to <Text style={{ color: colors.accent, fontWeight: '700' }}>@{replyToComment.author}</Text>
          </Text>
          <TouchableOpacity onPress={() => setReplyToComment(null)}>
            <MaterialCommunityIcons name="close" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      {/* Input */}
      <View style={[styles.footer, { backgroundColor: colors.background, borderTopColor: colors.border, padding: spacing.md }]}>
        <InputField
          placeholder="Contribute to thread..."
          value={commentText}
          onChangeText={setCommentText}
          containerStyle={{ flex: 1, marginBottom: 0 }}
        />
        <TouchableOpacity
          style={[styles.sendBtn, { backgroundColor: colors.accent, borderRadius: spacing.borderRadius.xs }]}
          onPress={handleAddComment}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="send" size={22} color={colors.background} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  sectionTitle: {
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    gap: 8,
  },
  sendBtn: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
