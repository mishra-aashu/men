import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../common/Button';

export default function CommunityCard({ community, isJoined, onJoinPress, onPress }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderRadius: spacing.borderRadius.sm,
          borderColor: isJoined ? colors.accent : colors.border,
          borderWidth: 1.5,
          padding: spacing.md,
          marginBottom: spacing.md,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surfaceLight, borderRadius: spacing.borderRadius.xs }]}>
          <MaterialCommunityIcons name={community.icon || 'chat'} size={24} color={colors.accent} />
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md }]}>
            {community.name}
          </Text>
          <Text style={[styles.members, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {community.memberCount} Members
          </Text>
        </View>
        <Button
          title={isJoined ? 'Joined' : 'Join'}
          variant={isJoined ? 'secondary' : 'primary'}
          onPress={onJoinPress}
          style={styles.joinBtn}
          textStyle={{ fontSize: 11, paddingVertical: 2 }}
        />
      </View>
      <Text style={[styles.description, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.sm,
        lineHeight: 20,
        marginTop: spacing.sm,
      }]}>
        {community.description}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  members: {
    marginTop: 2,
  },
  joinBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  description: {
    fontWeight: '400',
  },
});
