import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/common/EmptyState';

export default function BlockedUsersScreen() {
  const { colors, typography, spacing } = useTheme();

  const blockedUsers = []; // mock blocked users

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={blockedUsers}
        keyExtractor={(item) => item.id}
        renderItem={null}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="account-check-outline"
            title="Shatterproof Shield"
            message="No users are currently blocked."
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
});
