// TabNavDashboard.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import Explore from './Explore';
import Notification from './NotificationScreen';
import TabBar from '../components/TabBar';

const Tab = createBottomTabNavigator();

export default function TabNavDashboard() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Explore') {
            iconName = 'search-outline';
          } else if (route.name === 'Notification') { 
            iconName = 'notifications-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarActiveTintColor: '#fbbf24', headerShown: false }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{ tabBarActiveTintColor: '#fbbf24', headerShown: false }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarActiveTintColor: '#fbbf24', headerShown: false }}
      />
    </Tab.Navigator>
  );
}
