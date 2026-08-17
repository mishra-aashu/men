import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/common/EmptyState';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const { colors, typography, spacing } = useTheme();

  const notifications = [
    { id: '1', title: 'Someone commented on your post', body: '"Hold your head up high. This phase will pass..."', time: '1h ago', icon: 'comment-text-outline' },
    { id: '2', title: 'Daily check-in reminder', body: 'Secure your daily streak! How is your vibe today?', time: '3h ago', icon: 'emoticon-outline' },
    { id: '3', title: 'New circle approved', body: 'The circle "Finances & Debt" has been approved.', time: '1 day ago', icon: 'shield-check-outline' },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.notiCard, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, borderRadius: spacing.borderRadius.xs }]}>
      <View style={styles.notiHeader}>
        <MaterialCommunityIcons name={item.icon} size={20} color={colors.accent} />
        <Text style={[styles.notiTitle, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm, marginLeft: 8 }]}>
          {item.title}
        </Text>
      </View>
      <Text style={[styles.notiBody, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs, marginTop: spacing.xs }]}>
        {item.body}
      </Text>
      <Text style={[styles.notiTime, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 10, alignSelf: 'flex-end', marginTop: 4 }]}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="bell-off-outline"
            title="Silence is Golden"
            message="No notifications currently logged."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notiCard: {
    borderWidth: 1.5,
    marginBottom: 8,
  },
  notiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notiTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  notiBody: {
    lineHeight: 18,
    paddingLeft: 28,
  },
  notiTime: {
    fontWeight: '400',
  },
});
