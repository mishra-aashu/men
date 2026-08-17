import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import EmptyState from '../../components/common/EmptyState';

export default function ReportHistoryScreen() {
  const { colors, typography, spacing } = useTheme();

  const reports = []; // mock reports

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={null}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="shield-alert-outline"
            title="Clean Log Record"
            message="You haven't flagged or reported any content."
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
