import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Button from '../../components/common/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MentorChatScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();

  const benefits = [
    { title: 'COMPLETE ANONYMITY', desc: 'Even your therapist doesn\'t know your real name or face.' },
    { title: 'VERIFIED LIFE COACHES', desc: 'Professionals specialized in male mental fitness, career burnout, and breakups.' },
    { title: 'UNLIMITED TEXT & VOICE', desc: 'Message your mentor anytime, response guaranteed within 4 hours.' }
  ];

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="shield-crown" size={64} color={colors.accent} />
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xl,
          marginTop: spacing.md,
          textAlign: 'center',
        }]}>
          THE GOLD CAVE MENTOR
        </Text>
        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          textAlign: 'center',
          marginTop: spacing.xs,
          marginBottom: spacing.lg,
        }]}>
          1:1 Anonymous Counsel & Guidance
        </Text>
      </View>

      {/* Benefits Card */}
      <View style={[styles.benefitsList, { gap: spacing.md }]}>
        {benefits.map((b, index) => (
          <View key={index} style={[styles.benefitCard, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, borderRadius: spacing.borderRadius.xs }]}>
            <View style={styles.cardHeader}>
              <MaterialCommunityIcons name="check-decagram" size={20} color={colors.accent} />
              <Text style={[styles.cardTitle, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm, marginLeft: 8 }]}>
                {b.title}
              </Text>
            </View>
            <Text style={[styles.cardDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs, marginTop: spacing.xs }]}>
              {b.desc}
            </Text>
          </View>
        ))}
      </View>

      {/* Call to Action */}
      <View style={[styles.cta, { backgroundColor: colors.surfaceLight, padding: spacing.md, borderRadius: spacing.borderRadius.xs, marginTop: spacing.xl, marginBottom: spacing.lg }]}>
        <Text style={[styles.price, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.lg, textAlign: 'center' }]}>
          $29.99 / MONTH
        </Text>
        <Text style={[styles.priceDesc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs, textAlign: 'center', marginVertical: spacing.xs }]}>
          Cancel anytime. 100% confidential.
        </Text>
        <Button
          title="UNLOCK MENTOR SUPPORT"
          variant="primary"
          onPress={() => navigation.navigate('Subscription')}
          style={{ marginTop: spacing.md }}
        />
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
  benefitsList: {
    width: '100%',
  },
  benefitCard: {
    borderWidth: 1.5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  cardDesc: {
    lineHeight: 18,
    paddingLeft: 28,
  },
  cta: {
    width: '100%',
  },
  price: {
    fontWeight: '800',
  },
  priceDesc: {
    fontWeight: '500',
  },
});
