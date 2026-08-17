import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../common/Button';

export default function CommunityCard({ community, isJoined, onJoinPress, onPress }) {
  const { colors, typography, spacing } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: 'transparent',
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
          paddingVertical: spacing.md,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surfaceLight, borderRadius: 22, overflow: 'hidden' }]}>
          {community.image ? (
            <Image source={{ uri: community.image }} style={styles.cardImage} />
          ) : (
            <MaterialCommunityIcons name={community.icon || 'chat'} size={24} color={colors.accent} />
          )}
        </View>
        <View style={styles.headerText}>
          <Text style={[styles.name, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md }]}>
            {community.name}
          </Text>
          <Text style={[styles.members, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {community.memberCount} Members
          </Text>
        </View>
        {!isJoined && (
          <Button
            title="Join"
            variant="primary"
            onPress={onJoinPress}
            style={styles.joinBtn}
            textStyle={{ fontSize: 11, paddingVertical: 2 }}
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  members: {
    marginTop: 2,
  },
  joinBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  description: {
    fontWeight: '400',
  },
});
