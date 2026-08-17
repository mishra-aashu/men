import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function PrivacyScreen() {
  const { colors, typography, spacing } = useTheme();
  
  const [incognito, setIncognito] = useState(true);
  const [clearPosts, setClearPosts] = useState(false);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <Text style={[styles.title, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.header,
        fontSize: typography.sizes.xl,
        marginBottom: spacing.xl,
        textTransform: 'uppercase',
      }]}>
        PRIVACY PREFERENCES
      </Text>

      <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border, padding: spacing.md, borderRadius: spacing.borderRadius.xs }]}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm }]}>
              FORCE GHOST ANONYMITY
            </Text>
            <Text style={[styles.desc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
              Automatically disguise username alias in all circles feeds.
            </Text>
          </View>
          <Switch
            value={incognito}
            onValueChange={setIncognito}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={incognito ? colors.background : colors.textSecondary}
          />
        </View>

        <View style={[styles.row, { borderTopWidth: 1.5, borderTopColor: colors.border, marginTop: spacing.md, paddingTop: spacing.md }]}>
          <View style={styles.textContainer}>
            <Text style={[styles.label, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm }]}>
              AUTO-PURGE LOGS WEEKLY
            </Text>
            <Text style={[styles.desc, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
              Remove history of your personal posts from database automatically every 7 days.
            </Text>
          </View>
          <Switch
            value={clearPosts}
            onValueChange={setClearPosts}
            trackColor={{ false: colors.border, true: colors.accent }}
            thumbColor={clearPosts ? colors.background : colors.textSecondary}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1.5,
    textAlign: 'center',
  },
  card: {
    borderWidth: 1.5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  label: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  desc: {
    marginTop: 2,
    lineHeight: 16,
  },
});
