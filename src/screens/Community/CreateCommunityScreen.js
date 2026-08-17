import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';

export default function CreateCommunityScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const toast = useToast();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (!name.trim() || !description.trim()) {
      toast.warning('Fill all circles details.');
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
  title: {
    fontWeight: '900',
    letterSpacing: 1,
  },
  subtitle: {
    fontWeight: '500',
  },
});
