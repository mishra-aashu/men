import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../../components/common/Avatar';
import StreakBadge from '../../components/moodcheckin/StreakBadge';

export default function OtherUserProfileScreen({ route }) {
  const { username = 'Brother Knight', avatar = 'ninja' } = route.params || {};
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={styles.header}>
        <Avatar type={avatar} size={80} />
        <Text style={[styles.username, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.xl, marginTop: spacing.md }]}>
          {username}
        </Text>
        <Text style={[styles.status, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm, marginBottom: spacing.md }]}>
          Shield Active
        </Text>
        <StreakBadge count={5} />
      </View>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, marginTop: spacing.xl }]}>
        <Text style={[styles.cardText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
          "This member is browsing in pseudonymous shield mode. Complete logs are hidden to preserve the sanctity of the feed."
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  username: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  status: {
    fontWeight: '500',
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    width: '90%',
  },
  cardText: {
    textAlign: 'center',
    lineHeight: 20,
  },
});
