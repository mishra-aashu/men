import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../../context/ToastContext';
import Avatar from '../common/Avatar';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ReplyItem({ reply }) {
  const { colors, typography, spacing } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const handleProfilePress = () => {
    if (!reply.author || reply.author === 'Anonymous Member') {
      toast.info('Anonymous profiles are shielded to protect privacy.');
    } else {
      navigation.navigate('OtherUserProfile', { username: reply.author, avatar: 'ninja' });
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={[styles.container, { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm }]}
    >
      <TouchableOpacity
        style={styles.header}
        onPress={handleProfilePress}
        activeOpacity={0.7}
      >
        <Avatar type="anonymous" size={24} />
        <View style={styles.headerInfo}>
          <Text style={[styles.author, { color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
            {reply.author}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {reply.timestamp}
          </Text>
        </View>
      </TouchableOpacity>
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
