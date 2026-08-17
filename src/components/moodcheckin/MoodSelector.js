import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MOODS } from '../../utils/constants';

export default function MoodSelector({ selectedMood, onSelect }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={styles.container}>
      {MOODS.map((mood) => {
        const isSelected = selectedMood === mood.key;
        return (
          <TouchableOpacity
            key={mood.key}
            style={[
              styles.moodItem,
              {
                backgroundColor: isSelected ? colors.yellowMuted : colors.surface,
                borderColor: isSelected ? colors.accent : colors.border,
                borderRadius: spacing.borderRadius.xs,
                padding: spacing.md,
              },
            ]}
            onPress={() => onSelect(mood.key, mood.label)}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons
              name={mood.icon}
              size={36}
              color={isSelected ? colors.accent : colors.textSecondary}
            />
            <Text style={[
              styles.label,
              {
                color: isSelected ? colors.textPrimary : colors.textSecondary,
                fontFamily: typography.fontFamily.body,
                fontSize: typography.sizes.xs,
                marginTop: spacing.xs,
              },
            ]}>
              {mood.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  moodItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderWidth: 1.5,
  },
  label: {
    fontWeight: '700',
  },
});
