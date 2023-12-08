import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import TabNavDashboard from '../screens/TabNavDashboard';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import ExploreScreen from '../screens/Explore';
import EditProfileView from '../screens/editProfile';
// import LoginScreen from '../screens/LoginScreen';
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ResetPasswordScreen,
  Dashboard,
} from '../screens'
import { Provider } from 'react-native-paper'
// import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { theme } from '../core/theme'



const Stack = createNativeStackNavigator();

function AppNavigation() {
  // welcome screen should be in first after login and signup and after home screen 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="StartScreen" component={StartScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="LoginScreen" component={LoginScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="RegisterScreen" component={RegisterScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="Dashboard" component={Dashboard}  options={{ headerShown: false }}/>
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="UserProfile" component={EditProfileView} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavDashboard" component={TabNavDashboard} options={{ headerShown: false }} />
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
          
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;