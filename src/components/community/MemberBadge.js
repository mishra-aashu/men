import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MemberBadge({ role = 'member' }) {
  const { colors, spacing, typography } = useTheme();

  const getBadgeStyle = () => {
    switch (role) {
      case 'moderator':
        return { label: 'MOD', color: colors.danger, icon: 'shield-check-outline', bg: 'rgba(193, 18, 31, 0.15)' };
      case 'mentor':
        return { label: 'MENTOR', color: colors.success, icon: 'medal-outline', bg: 'rgba(42, 157, 143, 0.15)' };
      case 'pioneer':
        return { label: 'FOUNDER', color: colors.accent, icon: 'flash-outline', bg: colors.yellowMuted };
      default:
        return { label: 'MEMBER', color: colors.textSecondary, icon: 'account-outline', bg: 'rgba(255, 255, 255, 0.05)' };
    }
  };

  const badge = getBadgeStyle();

  return (
    <View style={[styles.badge, { backgroundColor: badge.bg, borderRadius: 4, paddingHorizontal: spacing.sm, paddingVertical: 2 }]}>
      <MaterialCommunityIcons name={badge.icon} size={12} color={badge.color} style={{ marginRight: 4 }} />
      <Text style={[styles.text, {
        color: badge.color,
        fontFamily: typography.fontFamily.header,
        fontSize: 10,
        fontWeight: typography.weights.bold,
        letterSpacing: 0.5,
      }]}>
        {badge.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '800',
  },
});
