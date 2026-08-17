import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';
import Avatar from '../../components/common/Avatar';
import StreakBadge from '../../components/moodcheckin/StreakBadge';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { user, logout } = useAuth();
  const { streakCount } = useUser();

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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.profileHeader, { borderBottomColor: colors.border, padding: spacing.lg }]}>
        <Avatar type={user?.avatar || 'anonymous'} size={80} />
        <Text style={[styles.username, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.xl, marginTop: spacing.md }]}>
          {user?.username || 'Anonymous Member'}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm, marginBottom: spacing.md }]}>
          {user?.email}
        </Text>
        <StreakBadge count={streakCount} />
      </View>

      {/* Profile actions/edit */}
      <TouchableOpacity
        style={[styles.editBtn, { borderColor: colors.border, margin: spacing.md, borderRadius: spacing.borderRadius.xs }]}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <MaterialCommunityIcons name="pencil-outline" size={16} color={colors.textPrimary} style={{ marginRight: 8 }} />
        <Text style={[styles.editBtnText, { color: colors.textPrimary, fontFamily: typography.fontFamily.header }]}>
          EDIT MASK
        </Text>
      </TouchableOpacity>

      {/* Menu List */}
      <View style={[styles.menuList, { paddingHorizontal: spacing.md }]}>
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
  profileHeader: {
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  username: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  email: {
    fontWeight: '500',
  },
  editBtn: {
    borderWidth: 1.5,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  editBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
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
