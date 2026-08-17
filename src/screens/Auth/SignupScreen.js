import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function SignupScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { signup, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignup = async () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      await signup(email, password);
      navigation.navigate('GenderOath'); // Redirect to onboarding oath flow
    } catch (err) {
      alert(err.message || 'Signup failed. Please try again.');
    }
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
          CREATE SHELTER KEYS
        </Text>

        <InputField
          label="EMAIL"
          placeholder="your.email@example.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <InputField
          label="PASSWORD"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
          autoCapitalize="none"
        />

        <InputField
          label="CONFIRM PASSWORD"
          placeholder="••••••••"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
          autoCapitalize="none"
        />

        <Button
          title="CREATE ACCOUNT"
          variant="primary"
          onPress={handleSignup}
          loading={isLoading}
          style={{ marginTop: spacing.md }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={styles.loginLink}
      >
        <Text style={[styles.loginText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
          Already running? <Text style={{ color: colors.accent, fontWeight: '700' }}>SIGN IN</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1.5,
  },
  loginLink: {
    alignSelf: 'center',
    paddingVertical: 12,
  },
  loginText: {
    fontWeight: '500',
  },
});
