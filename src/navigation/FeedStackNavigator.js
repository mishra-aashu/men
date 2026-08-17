import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeFeedScreen from '../screens/Feed/HomeFeedScreen';
import PostDetailScreen from '../screens/Feed/PostDetailScreen';
import SearchScreen from '../screens/Feed/SearchScreen';
import { useTheme } from '../context/ThemeContext';

const Stack = createNativeStackNavigator();

export default function FeedStackNavigator() {
  const { colors, typography } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        animationDuration: 300,
        gestureEnabled: true,
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
      <Stack.Screen
        name="HomeFeed"
        component={HomeFeedScreen}
        options={{ title: 'FEED' }}
      />
      <Stack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ title: 'CONVERSATION' }}
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: 'SEARCH' }}
      />
    </Stack.Navigator>
  );
}
