import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileMenuScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { logout } = useAuth();

  const menuItems = [
    { label: 'DAILY VIBE CHECK-IN', icon: 'emoticon-outline', screen: 'DailyCheckIn' },
    { label: 'MOOD HISTORY MATRIX', icon: 'history', screen: 'MoodHistory' },
    { label: 'BOOKMARKED POSTS', icon: 'bookmark-outline', screen: 'SavedPosts' },
    { label: 'MY LOG HISTORY', icon: 'history', screen: 'MyPosts' },
    { label: 'CRISIS SUPPORT RESOURCES', icon: 'lifebuoy', screen: 'CrisisSupport', highlight: true },
    { label: 'UPGRADE TO GOLD MEMBER', icon: 'crown', screen: 'Subscription' },
    { label: 'SETTINGS', icon: 'cog-outline', screen: 'Settings' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <Text style={[styles.title, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.header,
        fontSize: typography.sizes.xl,
        marginBottom: spacing.lg,
        textTransform: 'uppercase',
      }]}>
        PROFILE OPTIONS
      </Text>

      {/* Menu List */}
      <View style={styles.menuList}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.menuItem,
              {
                backgroundColor: colors.surface,
                borderColor: item.highlight ? colors.danger : colors.border,
                borderRadius: spacing.borderRadius.xs,
                padding: spacing.md,
                marginBottom: spacing.sm,
              }
            ]}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.8}
          >
            <View style={styles.menuItemLeft}>
              <MaterialCommunityIcons
                name={item.icon}
                size={20}
                color={item.highlight ? colors.danger : colors.accent}
              />
              <Text style={[
                styles.menuItemText,
                {
                  color: item.highlight ? colors.danger : colors.textPrimary,
                  fontFamily: typography.fontFamily.header,
                  fontSize: typography.sizes.sm,
                  marginLeft: 12,
                }
              ]}>
                {item.label}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color={colors.textSecondary} />
          </TouchableOpacity>
        ))}

        {/* Logout */}
        <TouchableOpacity
          style={[
            styles.menuItem,
            {
              backgroundColor: 'rgba(193, 18, 31, 0.1)',
              borderColor: colors.danger,
              borderRadius: spacing.borderRadius.xs,
              padding: spacing.md,
              marginTop: spacing.md,
              marginBottom: spacing.xl,
            }
          ]}
          onPress={logout}
          activeOpacity={0.8}
        >
          <View style={styles.menuItemLeft}>
            <MaterialCommunityIcons name="logout" size={20} color={colors.danger} />
            <Text style={[
              styles.menuItemText,
              {
                color: colors.danger,
                fontFamily: typography.fontFamily.header,
                fontSize: typography.sizes.sm,
                marginLeft: 12,
              }
            ]}>
              DISCONNECT SESSION (LOGOUT)
            </Text>
          </View>
        </TouchableOpacity>
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
    letterSpacing: 1,
    marginTop: 8,
  },
  menuList: {
    marginTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
