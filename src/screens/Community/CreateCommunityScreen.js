import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const AVAILABLE_ICONS = [
  'briefcase',
  'heart-broken',
  'baby-carriage',
  'dumbbell',
  'book-open-variant',
  'gamepad-variant',
  'heart-pulse',
  'shield-cross',
  'handshake',
  'chat'
];

export default function CreateCommunityScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const toast = useToast();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('chat');
  const [iconImage, setIconImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      toast.warning('Permission to access library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setIconImage(result.assets[0].uri);
    }
  };

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.warning('Fill all circle details.');
      return;
    }
    toast.success('Proposed circle submitted. Pending moderator clearance.');
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: colors.background, padding: spacing.md }]}>
      <Text style={[styles.title, {
        color: colors.textPrimary,
        fontFamily: typography.fontFamily.header,
        fontSize: typography.sizes.xl,
        marginBottom: spacing.xs,
        textTransform: 'uppercase',
      }]}>
        PROPOSE NEW CIRCLE
      </Text>
      <Text style={[styles.subtitle, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.sm,
        marginBottom: spacing.xl,
      }]}>
        Start a focus circle where brothers can support one another. Subject to approval.
      </Text>

      {/* Profile Photo Icon Picker */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity
          style={[
            styles.avatarWrapper,
            {
              backgroundColor: colors.surface,
              borderColor: colors.accent,
              borderWidth: 2,
            }
          ]}
          onPress={pickImage}
          activeOpacity={0.8}
        >
          {iconImage ? (
            <Image source={{ uri: iconImage }} style={styles.avatarImage} />
          ) : (
            <MaterialCommunityIcons
              name={selectedIcon}
              size={48}
              color={colors.accent}
            />
          )}
          <View style={[styles.editIconBadge, { backgroundColor: colors.accent }]}>
            <MaterialCommunityIcons name="camera" size={14} color={colors.background} />
          </View>
        </TouchableOpacity>
        <Text style={[styles.avatarLabel, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 11, marginTop: spacing.sm }]}>
          TAP TO UPLOAD CUSTOM IMAGE
        </Text>
        {iconImage && (
          <TouchableOpacity
            onPress={() => setIconImage(null)}
            style={{ marginTop: 8 }}
          >
            <Text style={{ color: colors.danger, fontFamily: typography.fontFamily.body, fontSize: 12, fontWeight: '600' }}>
              Remove custom image
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.sectionLabel, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.xs,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }]}>
        OR CHOOSE FROM PRESETS
      </Text>
      
      <View style={styles.iconGrid}>
        {AVAILABLE_ICONS.map((iconName) => {
          const isSelected = !iconImage && selectedIcon === iconName;
          return (
            <TouchableOpacity
              key={iconName}
              style={[
                styles.iconBox,
                {
                  backgroundColor: isSelected ? colors.accent : colors.surface,
                  borderColor: isSelected ? colors.accent : colors.border,
                  borderRadius: spacing.borderRadius.xs,
                  marginRight: spacing.sm,
                  marginBottom: spacing.sm,
                }
              ]}
              onPress={() => {
                setSelectedIcon(iconName);
                setIconImage(null);
              }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={iconName}
                size={24}
                color={isSelected ? colors.background : colors.textPrimary}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <InputField
        label="CIRCLE NAME"
        placeholder="e.g. Divorce Recovery, Startup Grinds..."
        value={name}
        onChangeText={setName}
      />

      <InputField
        label="DESCRIPTION"
        placeholder="Detail what this circle is about..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        inputStyle={{ height: 100, textAlignVertical: 'top' }}
      />

      <Button
        title="PROPOSE CIRCLE"
        variant="primary"
        onPress={handleCreate}
        style={{ marginTop: spacing.md, marginBottom: spacing.xl }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    fontWeight: '500',
  },
  sectionLabel: {
    fontWeight: '600',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  editIconBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
  },
  avatarLabel: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
});
