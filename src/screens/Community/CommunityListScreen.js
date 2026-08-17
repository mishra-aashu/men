import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import CommunityCard from '../../components/community/CommunityCard';
import { COMMUNITIES } from '../../utils/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CommunityListScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { joinedCommunityIds, toggleJoinCommunity } = useUser();

  const renderCommunity = ({ item }) => {
    const isJoined = joinedCommunityIds.includes(item.id);
    return (
      <CommunityCard
        community={item}
        isJoined={isJoined}
        onJoinPress={() => toggleJoinCommunity(item.id)}
        onPress={() => navigation.navigate('CommunityDetail', { communityId: item.id, name: item.name })}
      />
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={COMMUNITIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCommunity}
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl + 40 }}
      />

      {/* Floating Action Button to Create Community */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={() => navigation.navigate('CreateCommunity')}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="plus" size={28} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
});
