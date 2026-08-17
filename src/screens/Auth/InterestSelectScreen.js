import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function InterestSelectScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { updateOnboarding } = useAuth();
  const [selectedInterests, setSelectedInterests] = useState([]);

  const topics = [
    { id: 'career', name: 'Work & Career', icon: 'briefcase-outline' },
    { id: 'breakup', name: 'Breakup & Divorce', icon: 'heart-broken-outline' },
    { id: 'fitness', name: 'Physical Fitness', icon: 'dumbbell' },
    { id: 'fatherhood', name: 'Fatherhood & Kids', icon: 'baby-carriage' },
    { id: 'finances', name: 'Wealth & Debt', icon: 'cash' },
    { id: 'addiction', name: 'Overcoming Habits', icon: 'water-off' },
    { id: 'mental_health', name: 'Anxiety & Moods', icon: 'brain' },
    { id: 'brotherhood', name: 'Just Brotherhood', icon: 'handshake' }
  ];

  const handleToggle = (id) => {
    setSelectedInterests((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleNext = () => {
    if (selectedInterests.length > 0) {
      updateOnboarding({ interests: selectedInterests });
      navigation.navigate('AnonymousMode');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <MaterialCommunityIcons name="target" size={48} color={colors.accent} style={styles.icon} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xl,
          marginBottom: spacing.xs,
        }]}>
          WHAT ARE YOUR SHIELDS?
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          marginBottom: spacing.lg,
        }]}>
          Select at least 1 topic that matters to you right now.
        </Text>

        <View style={styles.grid}>
          {topics.map((topic) => {
            const isSelected = selectedInterests.includes(topic.id);
            return (
              <TouchableOpacity
                key={topic.id}
                style={[
                  styles.topicBtn,
                  {
                    backgroundColor: colors.surface,
                    borderColor: isSelected ? colors.accent : colors.border,
                    borderWidth: 2,
                    borderRadius: spacing.borderRadius.xs,
                    padding: spacing.md,
                  }
                ]}
                onPress={() => handleToggle(topic.id)}
                activeOpacity={0.8}
              >
                <MaterialCommunityIcons
                  name={topic.icon}
                  size={24}
                  color={isSelected ? colors.accent : colors.textSecondary}
                />
                <Text style={[
                  styles.topicText,
                  {
                    color: isSelected ? colors.textPrimary : colors.textSecondary,
                    fontFamily: typography.fontFamily.body,
                    fontSize: typography.sizes.sm,
                    marginTop: spacing.xs,
                  }
                ]}>
                  {topic.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      <Button
        title="PROCEED"
        variant={selectedInterests.length > 0 ? 'primary' : 'secondary'}
        onPress={handleNext}
        disabled={selectedInterests.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 20,
  },
  topicBtn: {
    width: '47%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topicText: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
