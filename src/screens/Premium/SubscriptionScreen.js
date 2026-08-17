import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SubscriptionScreen() {
  const { colors, typography, spacing } = useTheme();
  const { user, setUser } = useAuth();
  const toast = useToast();

  const handleSubscribe = () => {
    setUser((prev) => ({
      ...prev,
      isPremium: true,
    }));
    toast.success('Welcome to the Gold Shield. Features upgraded.');
  };

  const perks = [
    { name: '1:1 Mentor Hotline', desc: 'Direct secure access to verified counselors.' },
    { name: 'Emblem Customization', desc: 'Exclusive gold emblems and badges.' },
    { name: 'Private Circle creation', desc: 'Initiate invite-only circles for you and your brothers.' },
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="crown-outline" size={80} color={colors.accent} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xxl,
          marginTop: spacing.md,
          textAlign: 'center',
        }]}>
          THE GOLD SHIELD
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          textAlign: 'center',
          marginTop: spacing.xs,
          marginBottom: spacing.xl,
        }]}>
          Power your resilience journey with ultimate customization and verified professional help.
        </Text>
      </View>

      <View style={[styles.perksList, { gap: spacing.md }]}>
        {perks.map((p, index) => (
          <View key={index} style={[styles.perkCard, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, borderRadius: spacing.borderRadius.xs }]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.accent} />
              <Text style={[styles.perkName, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm, marginLeft: 8 }]}>
                {p.name}
              </Text>
            </View>
            <Text style={[styles.perkDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs, marginTop: spacing.xs }]}>
              {p.desc}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.upgradeCard, { backgroundColor: colors.yellowMuted, borderColor: colors.accent, padding: spacing.md, borderRadius: spacing.borderRadius.xs, marginTop: spacing.xl }]}>
        <Text style={[styles.upgradeTitle, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md, textAlign: 'center' }]}>
          {user?.isPremium ? 'CURRENT STATUS: GOLD MEMBER' : 'UPGRADE TO GOLD SHIELD'}
        </Text>
        <Text style={[styles.upgradePrice, { color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.xl, textAlign: 'center', marginVertical: spacing.xs }]}>
          {user?.isPremium ? 'ALL PERKS UNLOCKED' : '$29.99 / MONTH'}
        </Text>
        {!user?.isPremium && (
          <Button
            title="ACTIVATE NOW"
            variant="primary"
            onPress={handleSubscribe}
            style={{ marginTop: spacing.md }}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontWeight: '500',
  },
  perksList: {
    width: '100%',
  },
  perkCard: {
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  perkName: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  perkDesc: {
    lineHeight: 18,
    paddingLeft: 28,
  },
  upgradeCard: {
    borderWidth: 1.5,
    width: '100%',
  },
  upgradeTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  upgradePrice: {
    fontWeight: '900',
  },
});
