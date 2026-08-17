import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../common/Avatar';
import PostActions from './PostActions';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function PostCard({ post, onLike, onSave, onCommentPress, onReportPress, onCardPress }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <Animated.View entering={FadeInDown.duration(400)}>
      <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: spacing.borderRadius.sm,
          borderColor: post.type === 'post' ? colors.yellowMuted : colors.border,
          borderWidth: post.type === 'post' ? 1.5 : 1,
          padding: spacing.md,
          marginBottom: spacing.md,
        },
      ]}
      onPress={onCardPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <Avatar type={post.avatar} size={40} />
        <View style={styles.headerInfo}>
          <Text style={[styles.author, { color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.md }]}>
            {post.author}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {post.timestamp}
          </Text>
        </View>
        
        {/* Type Badge (Post / Advice) */}
        <View style={[styles.badge, {
          backgroundColor: post.type === 'post' ? colors.yellowMuted : 'rgba(255, 255, 255, 0.05)',
          borderColor: post.type === 'post' ? colors.accent : colors.border,
          borderWidth: 1,
          borderRadius: spacing.borderRadius.xs - 4,
          paddingHorizontal: spacing.sm,
          paddingVertical: 2,
        }]}>
          <Text style={[styles.badgeText, {
            color: post.type === 'post' ? colors.accent : colors.textPrimary,
            fontFamily: typography.fontFamily.header,
            fontSize: 10,
            letterSpacing: 0.5,
          }]}>
            {post.type.toUpperCase()}
          </Text>
        </View>
      </View>

      <Text style={[styles.content, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.md,
        lineHeight: typography.lineHeights.body,
        marginVertical: spacing.sm,
      }]}>
        {post.content}
      </Text>

      {post.category && (
        <View style={[styles.categoryContainer, { backgroundColor: colors.surfaceLight, borderRadius: spacing.borderRadius.xs }]}>
          <Text style={[styles.categoryText, { color: colors.textSecondary, fontSize: 11 }]}>
            # {post.category}
          </Text>
        </View>
      )}

      <PostActions
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        isLiked={post.isLiked}
        isSaved={post.isSaved}
        onLike={onLike}
        onComment={onCommentPress}
        onSave={onSave}
        onReport={onReportPress}
      />
    </TouchableOpacity>
  </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerInfo: {
    marginLeft: 12,
    flex: 1,
  },
  author: {
    fontWeight: '700',
  },
  time: {
    marginTop: 2,
  },
  badge: {
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontWeight: '800',
  },
  content: {
    fontWeight: '400',
  },
  categoryContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  categoryText: {
    fontWeight: '600',
  },
});
