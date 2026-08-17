import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AnonymousModeScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { updateOnboarding } = useAuth();
  const [isAnon, setIsAnon] = useState(true);

  const handleNext = () => {
    updateOnboarding({ anonymousMode: isAnon });
    navigation.navigate('ProfileSetup');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="incognito-circle" size={54} color={colors.accent} style={styles.icon} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xl,
          marginBottom: spacing.xs,
        }]}>
          CHOOSE YOUR SHIELD MODE
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          marginBottom: spacing.xl,
        }]}>
          You can toggle this at any time in your Settings.
        </Text>

        <View style={styles.options}>
          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: colors.surface,
                borderColor: isAnon ? colors.accent : colors.border,
                borderWidth: 2,
                borderRadius: spacing.borderRadius.xs,
                padding: spacing.md,
                marginBottom: spacing.md,
              }
            ]}
            onPress={() => setIsAnon(true)}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <MaterialCommunityIcons name="ghost" size={24} color={isAnon ? colors.accent : colors.textSecondary} />
              <Text style={[styles.optionTitle, {
                color: isAnon ? colors.accent : colors.textPrimary,
                fontFamily: typography.fontFamily.header,
                fontSize: typography.sizes.md,
                marginLeft: 12,
              }]}>
                GHOST MODE (ANONYMOUS)
              </Text>
            </View>
            <Text style={[styles.optionDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
              All logs, comments, and posts are shared as 'Anonymous Member'. No one knows who you are.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionCard,
              {
                backgroundColor: colors.surface,
                borderColor: !isAnon ? colors.accent : colors.border,
                borderWidth: 2,
                borderRadius: spacing.borderRadius.xs,
                padding: spacing.md,
              }
            ]}
            onPress={() => setIsAnon(false)}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <MaterialCommunityIcons name="shield-half-full" size={24} color={!isAnon ? colors.accent : colors.textSecondary} />
              <Text style={[styles.optionTitle, {
                color: !isAnon ? colors.accent : colors.textPrimary,
                fontFamily: typography.fontFamily.header,
                fontSize: typography.sizes.md,
                marginLeft: 12,
              }]}>
                NICKNAME MODE (CUSTOM MASK)
              </Text>
            </View>
            <Text style={[styles.optionDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
              Choose a custom alias (e.g. 'DarkKnight_01') and select a retro emblem.
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button
        title="PROCEED"
        variant="primary"
        onPress={handleNext}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: '500',
  },
  options: {
    width: '100%',
  },
  optionCard: {
    width: '100%',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  optionDesc: {
    lineHeight: 20,
  },
});
