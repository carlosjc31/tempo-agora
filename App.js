import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppProvider, useApp } from './src/context/AppContext';
import HomeScreen from './src/screens/HomeScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import HistoryScreen from './src/screens/HistoryScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  const { theme } = useApp();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="Forecast"
        component={ForecastScreen}
        options={{ title: 'Próximos 5 dias' }}
      />
    </Stack.Navigator>
  );
}

function AppTabs() {
  const { theme, isDark, toggleTheme } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopColor: theme.border,
        },
        tabBarActiveTintColor: theme.accent,
        tabBarInactiveTintColor: theme.subText,
        headerStyle: { backgroundColor: theme.card },
        headerTintColor: theme.text,
        headerShadowVisible: false,
        headerRight: () => (
          <TouchableOpacity onPress={toggleTheme} style={{ marginRight: 16 }}>
            <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Tab.Screen
        name="Buscar"
        component={HomeStack}
        options={{
          tabBarLabel: 'Buscar',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🔍</Text>,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'Histórico',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 20 }}>🕓</Text>,
          title: 'Histórico de Buscas',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </AppProvider>
  );
}

import { registerRootComponent } from 'expo';
registerRootComponent(App);
