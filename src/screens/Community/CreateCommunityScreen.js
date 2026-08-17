import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [memberLimit, setMemberLimit] = useState('Unlimited');
  const [privacy, setPrivacy] = useState('Public');
  const [anonymity, setAnonymity] = useState('Mixed');

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.warning('Fill all circle details.');
      return;
    }
    toast.success('Proposed circle submitted. Pending moderator clearance.');
    navigation.goBack();
  };

  const renderIconBox = (iconName) => {
    const isSelected = selectedIcon === iconName;
    return (
      <TouchableOpacity
        key={iconName}
        style={[
          styles.iconBox,
          {
            backgroundColor: isSelected ? colors.accent : colors.surface,
            borderColor: isSelected ? colors.accent : colors.border,
            borderRadius: spacing.borderRadius.sm,
          }
        ]}
        onPress={() => setSelectedIcon(iconName)}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons
          name={iconName}
          size={24}
          color={isSelected ? colors.background : colors.textPrimary}
        />
      </TouchableOpacity>
    );
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

      {/* Profile Photo Icon Preview */}
      <View style={styles.avatarContainer}>
        <View
          style={[
            styles.avatarWrapper,
            {
              backgroundColor: colors.surface,
              borderColor: colors.accent,
              borderWidth: 2,
            }
          ]}
        >
          <MaterialCommunityIcons
            name={selectedIcon}
            size={48}
            color={colors.accent}
          />
        </View>
        <Text style={[styles.avatarLabel, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: 11, marginTop: spacing.sm }]}>
          SELECTED CIRCLE ICON
        </Text>
      </View>

      <Text style={[styles.sectionLabel, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.xs,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }]}>
        SELECT CIRCLE ICON
      </Text>
      
      <View style={{ marginBottom: spacing.md }}>
        <View style={styles.iconRow}>
          {AVAILABLE_ICONS.slice(0, 5).map(renderIconBox)}
        </View>
        <View style={styles.iconRow}>
          {AVAILABLE_ICONS.slice(5, 10).map(renderIconBox)}
        </View>
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

      {/* Advanced Settings */}
      <Text style={[styles.sectionLabel, {
        color: colors.textSecondary,
        fontFamily: typography.fontFamily.body,
        fontSize: typography.sizes.xs,
        marginTop: spacing.md,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
      }]}>
        ADVANCED SETTINGS
      </Text>

      <View style={[styles.settingsContainer, { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: spacing.borderRadius.sm, padding: spacing.md, marginBottom: spacing.md }]}>
        
        {/* Member Limit */}
        <View style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
            <Text style={{ color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13, fontWeight: '700' }}>
              MEMBER CAPACITY LIMIT
            </Text>
            <Text style={{ color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: 12, fontWeight: '700' }}>
              {memberLimit === 'Unlimited' ? 'NO LIMIT' : `${memberLimit} MEMBERS`}
            </Text>
          </View>
          <View style={styles.optionRow}>
            {['50', '100', '250', 'Unlimited'].map((opt, index) => {
              const isSelected = memberLimit === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.settingChip, {
                    backgroundColor: isSelected ? colors.accent : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isSelected ? colors.accent : colors.border,
                    borderRadius: spacing.borderRadius.xs,
                    marginRight: index === 3 ? 0 : 8,
                  }]}
                  onPress={() => setMemberLimit(opt)}
                >
                  <Text style={{ color: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.5)', fontFamily: typography.fontFamily.header, fontSize: 11, fontWeight: '800' }}>
                    {opt.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Circle Privacy */}
        <View style={{ marginBottom: spacing.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
            <Text style={{ color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13, fontWeight: '700' }}>
              PRIVACY MODE
            </Text>
            <Text style={{ color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: 12, fontWeight: '700' }}>
              {privacy === 'Public' ? 'ANYONE CAN JOIN' : 'REQUEST REQUIRED'}
            </Text>
          </View>
          <View style={styles.optionRow}>
            {['Public', 'Restricted'].map((opt, index) => {
              const isSelected = privacy === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.settingChip, {
                    backgroundColor: isSelected ? colors.accent : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isSelected ? colors.accent : colors.border,
                    borderRadius: spacing.borderRadius.xs,
                    marginRight: index === 1 ? 0 : 8,
                  }]}
                  onPress={() => setPrivacy(opt)}
                >
                  <Text style={{ color: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.5)', fontFamily: typography.fontFamily.header, fontSize: 11, fontWeight: '800' }}>
                    {opt.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Posting Policy / Anonymity */}
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs }}>
            <Text style={{ color: colors.textPrimary, fontFamily: typography.fontFamily.body, fontSize: 13, fontWeight: '700' }}>
              POSTING POLICY
            </Text>
            <Text style={{ color: colors.accent, fontFamily: typography.fontFamily.header, fontSize: 12, fontWeight: '700' }}>
              {anonymity === 'Mixed' ? 'MIXED POSTS' : anonymity === 'Anonymous' ? 'STRICT ANONYMOUS' : 'ALIAS ONLY'}
            </Text>
          </View>
          <View style={styles.optionRow}>
            {[
              { id: 'Mixed', label: 'Mixed' },
              { id: 'Anonymous', label: 'Anon Only' },
              { id: 'Identified', label: 'Alias Only' }
            ].map((opt, index) => {
              const isSelected = anonymity === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  style={[styles.settingChip, {
                    backgroundColor: isSelected ? colors.accent : 'rgba(255, 255, 255, 0.03)',
                    borderColor: isSelected ? colors.accent : colors.border,
                    borderRadius: spacing.borderRadius.xs,
                    marginRight: index === 2 ? 0 : 8,
                  }]}
                  onPress={() => setAnonymity(opt.id)}
                >
                  <Text style={{ color: isSelected ? '#000000' : 'rgba(255, 255, 255, 0.5)', fontFamily: typography.fontFamily.header, fontSize: 11, fontWeight: '800' }}>
                    {opt.label.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </View>

      <Button
        title="PROPOSE CIRCLE"
        variant="primary"
        onPress={handleCreate}
        style={{ marginTop: spacing.md, marginBottom: 40 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingBottom: 40,
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
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLabel: {
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  iconBox: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
  },
  settingsContainer: {
    marginTop: 8,
  },
  optionRow: {
    flexDirection: 'row',
    width: '100%',
  },
  settingChip: {
    flex: 1,
    paddingVertical: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
