import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import Avatar from '../../components/common/Avatar';

export default function EditProfileScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { user, setUser } = useAuth();
  const toast = useToast();

  const [username, setUsername] = useState(user?.username || '');
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'batman');

  const avatarTypes = ['batman', 'knight', 'ninja', 'anonymous'];

  const handleSave = () => {
    if (!username.trim()) {
      toast.warning('Alias cannot be empty.');
      return;
    }
    setUser((prev) => ({
      ...prev,
      username,
      avatar: selectedAvatar,
    }));
    toast.success('Mask customized successfully.');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <View style={styles.avatarSection}>
        <Text style={[styles.sectionLabel, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
          SELECT AVATAR EMBLEM
        </Text>
        <View style={styles.avatarRow}>
          {avatarTypes.map((type) => {
            const isSelected = selectedAvatar === type;
            return (
              <TouchableOpacity
                key={type}
                onPress={() => setSelectedAvatar(type)}
                style={[styles.avatarWrapper, {
                  borderColor: isSelected ? colors.accent : 'transparent',
                  borderWidth: 2,
                  borderRadius: spacing.borderRadius.round,
                  padding: 4,
                }]}
              >
                <Avatar type={type} size={60} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <InputField
        label="NICKNAME / ALIAS"
        placeholder="Edit nickname..."
        value={username}
        onChangeText={setUsername}
      />

      <Button
        title="SAVE CHANGES"
        variant="primary"
        onPress={handleSave}
        style={{ marginTop: spacing.md }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionLabel: {
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
