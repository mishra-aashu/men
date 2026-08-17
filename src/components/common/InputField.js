import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function InputField({ label, placeholder, value, onChangeText, secureTextEntry, error, containerStyle, inputStyle, ...props }) {
  const { colors, typography, spacing } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, { marginBottom: spacing.md }, containerStyle]}>
      {label && (
        <Text style={[styles.label, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.xs,
          marginBottom: spacing.xs,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.surface,
            color: colors.textPrimary,
            borderColor: isFocused ? colors.accent : (error ? colors.danger : colors.border),
            padding: spacing.md,
            borderRadius: spacing.borderRadius.xs,
            fontFamily: typography.fontFamily.body,
            fontSize: typography.sizes.md,
          },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && (
        <Text style={[styles.error, {
          color: colors.danger,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.xs,
          marginTop: spacing.xs,
        }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    borderWidth: 1.5,
  },
  label: {
    fontWeight: '600',
  },
  error: {
    fontWeight: '500',
  },
});
