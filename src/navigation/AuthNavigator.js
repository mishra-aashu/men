import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Auth/OnboardingScreen';
import GenderOathScreen from '../screens/Auth/GenderOathScreen';
import AgeSelectScreen from '../screens/Auth/AgeSelectScreen';
import InterestSelectScreen from '../screens/Auth/InterestSelectScreen';
import AnonymousModeScreen from '../screens/Auth/AnonymousModeScreen';
import ProfileSetupScreen from '../screens/Auth/ProfileSetupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { colors, typography } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.textPrimary,
        headerTitleStyle: {
          fontFamily: typography.fontFamily.header,
          fontWeight: typography.weights.bold,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
        contentStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }} />
      <Stack.Screen name="GenderOath" component={GenderOathScreen} options={{ title: 'OATH OF BROTHERHOOD' }} />
      <Stack.Screen name="AgeSelect" component={AgeSelectScreen} options={{ title: 'AGE CHECK' }} />
      <Stack.Screen name="InterestSelect" component={InterestSelectScreen} options={{ title: 'INTERESTS' }} />
      <Stack.Screen name="AnonymousMode" component={AnonymousModeScreen} options={{ title: 'IDENTITY MODE' }} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: 'CHOOSE MASK' }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'SIGN IN' }} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'SIGN UP' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'RECOVER KEYS' }} />
    </Stack.Navigator>
  );
}
