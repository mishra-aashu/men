import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function PostAdviceToggle({ value, onChange }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderRadius: spacing.borderRadius.xs }]}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            paddingVertical: spacing.sm + 8,
            borderRadius: spacing.borderRadius.xs,
          },
          value === 'post' && { backgroundColor: colors.yellowMuted, borderColor: colors.accent, borderWidth: 1 }
        ]}
        activeOpacity={0.8}
        onPress={() => onChange('post')}
      >
        <Text style={[
          styles.text,
          {
            fontFamily: typography.fontFamily.header,
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.bold,
            color: value === 'post' ? colors.accent : colors.textSecondary,
          }
        ]}>
          POST
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          {
            paddingVertical: spacing.sm + 8,
            borderRadius: spacing.borderRadius.xs,
          },
          value === 'advice' && { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: colors.textPrimary, borderWidth: 1 }
        ]}
        activeOpacity={0.8}
        onPress={() => onChange('advice')}
      >
        <Text style={[
          styles.text,
          {
            fontFamily: typography.fontFamily.header,
            fontSize: typography.sizes.sm,
            fontWeight: typography.weights.bold,
            color: value === 'advice' ? colors.textPrimary : colors.textSecondary,
          }
        ]}>
          ADVICE
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 4,
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  text: {
    letterSpacing: 1,
  },
  subText: {
    marginTop: 2,
    fontWeight: '400',
  }
});
