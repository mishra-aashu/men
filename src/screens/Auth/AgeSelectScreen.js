import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function AgeSelectScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { updateOnboarding } = useAuth();
  const [selectedRange, setSelectedRange] = useState(null);

  const ageRanges = [
    { key: '18-24', label: '18 - 24' },
    { key: '25-34', label: '25 - 34' },
    { key: '35-44', label: '35 - 44' },
    { key: '45+', label: '45 and above' }
  ];

  const handleNext = () => {
    if (selectedRange) {
      updateOnboarding({ ageRange: selectedRange });
      navigation.navigate('InterestSelect');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={styles.content}>
        <MaterialCommunityIcons name="calendar-account" size={48} color={colors.accent} style={styles.icon} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xl,
          marginBottom: spacing.xs,
        }]}>
          HOW MUCH GROUND HAVE YOU COVERED?
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          marginBottom: spacing.xl,
        }]}>
          This helps us match you with brothers in similar phases of life.
        </Text>

        <View style={styles.grid}>
          {ageRanges.map((range) => {
            const isSelected = selectedRange === range.key;
            return (
              <TouchableOpacity
                key={range.key}
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.surface,
                    borderColor: isSelected ? colors.accent : colors.border,
                    borderWidth: 2,
                    borderRadius: spacing.borderRadius.xs,
                    padding: spacing.md,
                  }
                ]}
                onPress={() => setSelectedRange(range.key)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.optionText,
                  {
                    color: isSelected ? colors.accent : colors.textPrimary,
                    fontFamily: typography.fontFamily.header,
                    fontSize: typography.sizes.md,
                  }
                ]}>
                  {range.label}
                </Text>
                <MaterialCommunityIcons
                  name={isSelected ? 'radiobox-marked' : 'radiobox-blank'}
                  size={20}
                  color={isSelected ? colors.accent : colors.textSecondary}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <Button
        title="PROCEED"
        variant={selectedRange ? 'primary' : 'secondary'}
        onPress={handleNext}
        disabled={!selectedRange}
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
  grid: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionText: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
