//required React Native Imports
import React from 'react';
import { StyleSheet, View, Text, ImageBackground} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

//custom file imports
import AppButton from './app/components/AppButton';
import AppText from './app/components/AppText';
import AppColors from './app/config/AppColors';
import AppScreen from './app/components/AppScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import TestScreen from './app/screens/TestScreen';




export default function App() {
  return (
    // <WelcomeScreen/>

    // <LoginScreen/>

    // <RegisterScreen/>

    <TestScreen/>

  );
}

const styles = StyleSheet.create({
 
});
