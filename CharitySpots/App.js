//required React Native Imports
import React, { useState } from 'react';
import { StyleSheet, View, Text, ImageBackground} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';  

//custom file imports
import AppButton from './app/components/AppButton';
import AppText from './app/components/AppText';
import AppColors from './app/config/AppColors';
import AppScreen from './app/components/AppScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import HomeScreen from './app/screens/HomeScreen';
import CharityScreen from './app/screens/CharityScreen';
import OrganisationScreen from './app/screens/OrganisationScreen';
import NewCategoryScreen from './app/screens/NewCategoryScreen';
import AppIcon from './app/components/AppIcon';
import CharityList from './app/CharityList';
import dashboardScreen from './app/screens/dashboardScreen';
import moreInfoScreen from './app/screens/moreInfoScreen';

//AppStack and AppTab Navigator initialisation
const AppStack = createStackNavigator(); 
const AppTab = createBottomTabNavigator();

const AppNavigatorStack = () => {
  return (
    <AppStack.Navigator>
         <AppStack.Screen name="CharityList" component={CharityList} options={{title: 'Collections'}}/>
         <AppStack.Screen name="Dashboard" component={dashboardScreen}/>
         <AppStack.Screen name="More Info" component={moreInfoScreen}/>
    </AppStack.Navigator>
  );
};

const App = () => {
  const [startApp, setStartApp] = useState(false);

  const handleStartApp = () => {
    setStartApp(true);
  };

  const handleLogout = () => {
    setStartApp(false);
  };

  const handleGoBackToWelcomeScreen = () => {
    setStartApp(false);
  };


  const AuthNavigator = ({onPress}) => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: true}}>
        <AppStack.Screen name="Welcome" component={WelcomeScreen} options={{title: 'Welcome'}}/>
        <AppStack.Screen name="Login" options={{title:"Login"}}>
          {() => <LoginScreen startApp={handleStartApp}/>}
        </AppStack.Screen>
        <AppStack.Screen name="Register" options={{title:"Register"}}>
          {() => <RegisterScreen startApp={handleStartApp}/>}
        </AppStack.Screen>
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

return (
  <>
    {startApp ? (
      <NavigationContainer>    
        <AppTab.Navigator tabBarOptions={{activeTintColor: AppColors.primaryColor, activeBackgroundColor: AppColors.color1, inactiveTintColor: AppColors.color1,}} screenOptions={{headerShown: false,}}>
          <AppTab.Screen
            name="Home"
            component={() => <HomeScreen handleLogout={handleLogout}/>}
            options={{
              tabBarIcon: () => (
                <AppIcon size={30} name="home" backgroundColor={AppColors.primaryColor} iconColor={AppColors.color1}/>
              ),
              headerShown: false,
            }}
            />
          <AppTab.Screen
            name="Add Charity"
            component={NewCategoryScreen}
            options={{
              tabBarIcon: () => (
                <AppIcon
                  size={30}
                  name="heart-plus"
                  backgroundColor={AppColors.primaryColor}
                  iconColor={AppColors.color1}
                  />
                  ),
                }}
                />
          <AppTab.Screen
            name="My Favourites"
            component={CharityScreen}
            options={{title: "My Charities",
              tabBarIcon: () => (
                <AppIcon
                size={30}
                name="heart-multiple"
                backgroundColor={AppColors.primaryColor}
                iconColor={AppColors.color1}
                />
                ),
              }}
              />
            <AppTab.Screen
              name="charity"
              component={AppNavigatorStack}
              options={{
                tabBarIcon: () => (
                  <AppIcon
                  size={30}
                  name="hand-coin"
                  backgroundColor={AppColors.primaryColor}
                  iconColor={AppColors.color1}
                  />
                  ),
              }}
              />
        </AppTab.Navigator>
      </NavigationContainer>
    ) : (<AuthNavigator/>)
  }
  </>
);
};

export default App;
