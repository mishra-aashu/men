import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function StreakBadge({ count }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.badge, { backgroundColor: colors.yellowMuted, borderColor: colors.accent, borderRadius: spacing.borderRadius.xs }]}>
      <MaterialCommunityIcons name="fire" size={18} color={colors.accent} />
      <Text style={[styles.text, {
        color: colors.accent,
        fontFamily: typography.fontFamily.header,
        fontSize: typography.sizes.sm,
        fontWeight: typography.weights.bold,
        marginLeft: 4,
        letterSpacing: 0.5,
      }]}>
        {count} DAY STREAK
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '800',
  },
});
