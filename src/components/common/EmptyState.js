import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EmptyState({ icon = 'cloud-question', title = 'Nothing found', message = 'Check back later.' }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View style={[styles.container, { padding: spacing.xl }]}>
      <MaterialCommunityIcons name={icon} size={64} color={colors.textSecondary} style={{ marginBottom: spacing.md }} />
      <Text style={[styles.title, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.header,
        fontSize: typography.sizes.lg,
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
      }]}>
        {title}
      </Text>
      <Text style={[styles.message, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.sm,
      }]}>
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
  },
});
