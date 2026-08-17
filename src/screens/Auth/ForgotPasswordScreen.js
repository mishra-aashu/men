import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { validateEmail } from '../../utils/validators';

export default function ForgotPasswordScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    toast.success('If an account exists, recovery keys have been dispatched.');
    navigation.navigate('Login');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background, padding: spacing.lg }]}>
      <View style={styles.form}>
        <Text style={[styles.title, {
          color: colors.textPrimary,
          fontFamily: typography.fontFamily.header,
          fontSize: typography.sizes.xxl,
          marginBottom: spacing.lg,
          textAlign: 'center',
        }]}>
          RECOVER KEYS
        </Text>

        <Text style={[styles.subtitle, {
          color: colors.textSecondary,
          fontFamily: typography.fontFamily.body,
          fontSize: typography.sizes.sm,
          lineHeight: 20,
          marginBottom: spacing.xl,
          textAlign: 'center',
        }]}>
          Provide your registered email. We will transmit instructions to recover access.
        </Text>

        <InputField
          label="EMAIL"
          placeholder="your.email@example.com"
          value={email}
          onChangeText={setEmail}
          error={error}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Button
          title="DISPATCH CODE"
          variant="primary"
          onPress={handleReset}
          loading={loading}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontWeight: '500',
  },
});
