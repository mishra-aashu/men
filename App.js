import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';

import AuthNavigator from './src/navigation/AuthNavigator';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoadingSpinner from './src/components/common/LoadingSpinner';

function AppContent() {
  const { colors, themeMode } = useTheme();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={themeMode === 'batman' ? 'light' : 'auto'} />
      <NavigationContainer>
        {user ? <MainTabNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <AuthProvider>
          <UserProvider>
            <AppContent />
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
