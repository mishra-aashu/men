import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import { ToastProvider } from './src/context/ToastContext';

import AuthNavigator from './src/navigation/AuthNavigator';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import LoadingSpinner from './src/components/common/LoadingSpinner';

// Inject global style to hide scrollbars on Web/Desktop
if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.textContent = `
    ::-webkit-scrollbar {
      display: none;
    }
    * {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `;
  document.head.appendChild(style);
}

function AppContent() {
  const { colors, themeMode } = useTheme();
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={[styles.outerContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.container, { backgroundColor: colors.background, borderColor: colors.border }]}>
        <StatusBar style={themeMode === 'batman' ? 'light' : 'auto'} />
        <NavigationContainer>
          {user ? <MainTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </View>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <UserProvider>
              <AppContent />
            </UserProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
    ...Platform.select({
      web: {
        maxWidth: 600,
        alignSelf: 'center',
        borderLeftWidth: 1,
        borderRightWidth: 1,
      },
      default: {},
    }),
  },
});
