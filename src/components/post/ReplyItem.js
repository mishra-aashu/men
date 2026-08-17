import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../common/Avatar';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ReplyItem({ reply }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={[styles.container, { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm }]}
    >
      <View style={styles.header}>
        <Avatar type="anonymous" size={24} />
        <View style={styles.headerInfo}>
          <Text style={[styles.author, { color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
            {reply.author}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {reply.timestamp}
          </Text>
        </View>
      </View>
      <Text style={[styles.content, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.sm,
        lineHeight: typography.lineHeights.body - 4,
        marginTop: spacing.xs,
        paddingLeft: 36, // Align with author name rather than avatar
      }]}>
        {reply.content}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfo: {
    marginLeft: 10,
  },
  author: {
    fontWeight: '600',
  },
  time: {
    marginTop: 1,
  },
  content: {
    fontWeight: '400',
  },
});
