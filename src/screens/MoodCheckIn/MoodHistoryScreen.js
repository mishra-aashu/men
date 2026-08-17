import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import EmptyState from '../../components/common/EmptyState';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MOODS } from '../../utils/constants';

export default function MoodHistoryScreen() {
  const { colors, typography, spacing } = useTheme();
  const { moodHistory } = useUser();

  const getMoodIcon = (moodKey) => {
    const config = MOODS.find((m) => m.key === moodKey);
    return config || { icon: 'emoticon-neutral-outline', color: colors.textSecondary };
  };

  const renderItem = ({ item }) => {
    const config = getMoodIcon(item.mood);
    return (
      <View style={[styles.historyRow, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, borderRadius: spacing.borderRadius.xs }]}>
        <View style={styles.left}>
          <MaterialCommunityIcons name={config.icon} size={28} color={config.color} />
          <Text style={[styles.moodLabel, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md, marginLeft: 12 }]}>
            {item.label}
          </Text>
        </View>
        <Text style={[styles.date, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
          {item.date}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={moodHistory}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-blank"
            title="Matrix Empty"
            message="Secure your vibe daily to build your tracking matrix."
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
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    marginBottom: 8,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodLabel: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  date: {
    fontWeight: '500',
  },
});
