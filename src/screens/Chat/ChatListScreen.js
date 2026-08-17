import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Avatar from '../../components/common/Avatar';
import EmptyState from '../../components/common/EmptyState';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChatListScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();

  const chats = [
    { id: '1', name: 'Albus_Mentor', lastMessage: 'Remember: Courage is not the absence of fear.', time: '10:06 AM', unread: true, avatar: 'mentor', isPremium: true },
    { id: '2', name: 'Divorce Recovery Group', lastMessage: 'Alpha_01: Let it go, brother.', time: 'Yesterday', unread: false, avatar: 'group', isPremium: false },
    { id: '3', name: 'Iron Circle', lastMessage: 'Flex_Knight: Leg day tomorrow!', time: '2 days ago', unread: false, avatar: 'group', isPremium: false },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.chatRow,
        {
          backgroundColor: colors.surface,
          borderColor: item.unread ? colors.accent : colors.border,
          borderWidth: 1.5,
          padding: spacing.md,
          borderRadius: spacing.borderRadius.xs,
          marginBottom: spacing.sm,
        }
      ]}
      onPress={() => item.isPremium ? navigation.navigate('MentorChat') : navigation.navigate('ChatRoom', { name: item.name })}
      activeOpacity={0.9}
    >
      <Avatar type={item.avatar} size={44} />
      <View style={styles.chatInfo}>
        <View style={styles.chatHeader}>
          <Text style={[styles.name, { color: colors.textPrimary, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.md }]}>
            {item.name}
          </Text>
          <Text style={[styles.time, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            {item.time}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={[
            styles.lastMsg,
            {
              color: item.unread ? colors.textPrimary : colors.textSecondary,
              fontFamily: typography.fontFamily.body,
              fontSize: typography.sizes.sm,
              fontWeight: item.unread ? '700' : '400',
            }
          ]}
        >
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Top Premium Mentor Callout */}
      <TouchableOpacity
        style={[styles.premiumHeader, { backgroundColor: colors.yellowMuted, borderColor: colors.accent, borderBottomWidth: 1.5, padding: spacing.md }]}
        onPress={() => navigation.navigate('MentorChat')}
      >
        <View style={styles.premiumLeft}>
          <MaterialCommunityIcons name="crown" size={28} color={colors.accent} />
          <View style={{ marginLeft: 12 }}>
            <Text style={[styles.premTitle, { color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: typography.sizes.sm }]}>
              1:1 ANONYMOUS MENTOR SUPPORT
            </Text>
            <Text style={[styles.premDesc, { color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
              Talk to certified professionals anonymously.
            </Text>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={colors.accent} />
      </TouchableOpacity>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: spacing.md }}
        ListEmptyComponent={
          <EmptyState
            icon="chat-processing-outline"
            title="Silence in the Chats"
            message="Join a circle or contact a mentor to start."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  premiumHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  premTitle: {
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  premDesc: {
    fontWeight: '500',
    marginTop: 2,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatInfo: {
    marginLeft: 12,
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontWeight: '700',
  },
  time: {
    fontWeight: '400',
  },
  lastMsg: {
    marginTop: 2,
  },
});
