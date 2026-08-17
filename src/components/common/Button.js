import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function Button({ title, onPress, variant = 'primary', loading = false, style, textStyle, ...props }) {
  const { colors, typography, spacing } = useTheme();

  const buttonStyles = [
    styles.button,
    {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: spacing.borderRadius.xs, // Clean curved corners
    },
    variant === 'primary' && { backgroundColor: colors.accent, borderColor: colors.accent },
    variant === 'secondary' && { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1 },
    variant === 'danger' && { backgroundColor: colors.danger, borderColor: colors.danger },
    variant === 'outline' && { backgroundColor: 'transparent', borderColor: colors.accent, borderWidth: 1 },
    style,
  ];

  const textStyles = [
    styles.text,
    {
      fontFamily: typography.fontFamily.header,
      fontSize: typography.sizes.md,
      fontWeight: typography.weights.bold,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
    variant === 'primary' && { color: colors.background },
    variant === 'secondary' && { color: colors.textPrimary },
    variant === 'danger' && { color: colors.textPrimary },
    variant === 'outline' && { color: colors.accent },
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.background : colors.accent} />
      ) : (
        <Text style={textStyles}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    textAlign: 'center',
  },
});
