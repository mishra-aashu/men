import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PostActions({
  likesCount,
  commentsCount,
  isLiked,
  isSaved,
  onLike,
  onComment,
  onSave,
  onReport,
}) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { borderTopWidth: 1, borderTopColor: colors.border, marginTop: spacing.md, paddingTop: spacing.sm }]}>
      <TouchableOpacity style={styles.actionBtn} onPress={onLike}>
        <MaterialCommunityIcons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={20}
          color={isLiked ? colors.danger : colors.textSecondary}
        />
        <Text style={[styles.actionText, { color: isLiked ? colors.danger : colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
          {likesCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={onComment}>
        <MaterialCommunityIcons name="comment-text-outline" size={20} color={colors.textSecondary} />
        <Text style={[styles.actionText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
          {commentsCount}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={onSave}>
        <MaterialCommunityIcons
          name={isSaved ? 'bookmark' : 'bookmark-outline'}
          size={20}
          color={isSaved ? colors.accent : colors.textSecondary}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionBtn} onPress={onReport}>
        <MaterialCommunityIcons name="alert-octagon-outline" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    marginLeft: 6,
    fontWeight: '600',
  },
});
