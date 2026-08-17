import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/common/Button';
import InputField from '../../components/common/InputField';
import { validateEmail, validatePassword } from '../../utils/validators';

export default function LoginScreen({ navigation }) {
  const { colors, typography, spacing } = useTheme();
  const { login, isLoading } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = async () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email address';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setErrors({});
      await login(email, password);
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check credentials.');
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
          RE-ENTER THE FEED
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

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.forgotBtn}
        >
          <Text style={[styles.forgotText, { color: colors.accent, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.xs }]}>
            FORGOT PASSWORD?
          </Text>
        </TouchableOpacity>

        <Button
          title="SIGN IN"
          variant="primary"
          onPress={handleLogin}
          loading={isLoading}
          style={{ marginTop: spacing.md }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.signupLink}
      >
        <Text style={[styles.signupText, { color: colors.textSecondary, fontFamily: typography.fontFamily.body, fontSize: typography.sizes.sm }]}>
          Don't have a shelter? <Text style={{ color: colors.accent, fontWeight: '700' }}>SIGN UP</Text>
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
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    fontWeight: '700',
  },
  signupLink: {
    alignSelf: 'center',
    paddingVertical: 12,
  },
  signupText: {
    fontWeight: '500',
  },
});
