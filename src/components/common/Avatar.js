import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Avatar({ type = 'anonymous', size = 48 }) {
  const { colors } = useTheme();

  const getAvatarConfig = () => {
    switch (type) {
      case 'batman':
        return { icon: 'bat', bg: colors.yellowMuted, color: colors.accent };
      case 'knight':
        return { icon: 'shield-half-full', bg: '#2B2D42', color: '#8D99AE' };
      case 'ninja':
        return { icon: 'ninja', bg: '#252422', color: colors.textPrimary };
      case 'mentor':
        return { icon: 'school', bg: 'rgba(42, 157, 143, 0.2)', color: colors.success };
      case 'group':
        return { icon: 'account-group', bg: colors.surfaceLight, color: colors.textSecondary };
      default: // anonymous
        return { icon: 'incognito', bg: colors.surfaceLight, color: colors.textSecondary };
    }
  };

  const config = getAvatarConfig();

  return (
    <View style={[styles.avatar, {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: config.bg,
    }]}>
      <MaterialCommunityIcons name={config.icon} size={size * 0.55} color={config.color} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
