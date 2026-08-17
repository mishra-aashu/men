import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import MoodSelector from '../../components/moodcheckin/MoodSelector';
import StreakBadge from '../../components/moodcheckin/StreakBadge';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Animated, { FadeInDown } from 'react-native-reanimated';

export default function DailyCheckInScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { streakCount, hasCheckedInToday, checkInMood } = useUser();
  const toast = useToast();

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState('');

  const handleSelect = (key, label) => {
    setSelectedMood(key);
    setSelectedLabel(label);
  };

  const handleCheckIn = () => {
    if (!selectedMood) {
      toast.warning('Select your current energy first.');
      return;
    }
    checkInMood(selectedMood, selectedLabel);
    toast.success('Vibe logged. Streak secured.');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <View style={styles.header}>
        <StreakBadge count={streakCount} />
      </View>

      <Animated.View entering={FadeInDown.duration(400)} style={styles.main}>
        <MaterialCommunityIcons name="emoticon-happy-outline" size={48} color={colors.accent} style={styles.icon} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xl,
          marginBottom: spacing.xs,
          textAlign: 'center',
        }]}>
          WHAT IS YOUR VIBE TODAY?
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          marginBottom: spacing.xl,
          textAlign: 'center',
        }]}>
          Tracking your mood increases emotional control. Be honest; the feed is private.
        </Text>

        {hasCheckedInToday ? (
          <View style={[styles.successCard, { backgroundColor: colors.yellowMuted, borderColor: colors.accent, borderRadius: spacing.borderRadius.xs }]}>
            <MaterialCommunityIcons name="check-circle" size={32} color={colors.accent} />
            <Text style={[styles.successText, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md, marginTop: spacing.xs }]}>
              VIBE SECURED FOR TODAY
            </Text>
            <Text style={[styles.successDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm, marginTop: spacing.xs }]}>
              Come back tomorrow to increase your streak count.
            </Text>
          </View>
        ) : (
          <View style={styles.selectorContainer}>
            <MoodSelector selectedMood={selectedMood} onSelect={handleSelect} />
            
            <Button
              title="SECURE VIBE"
              variant={selectedMood ? 'primary' : 'secondary'}
              onPress={handleCheckIn}
              disabled={!selectedMood}
              style={{ marginTop: spacing.xl }}
            />
          </View>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    fontWeight: '500',
  },
  successCard: {
    alignItems: 'center',
    padding: 24,
    borderWidth: 1.5,
    marginHorizontal: 10,
  },
  successText: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  successDesc: {
    textAlign: 'center',
  },
  selectorContainer: {
    width: '100%',
  },
});
