// Required React Native imports
import React from 'react';
import { StyleSheet, ImageBackground, Platform, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Custom file imports
import AppScreen from '../components/AppScreen';
import AppText from '../components/AppText';
import AppColors from '../config/AppColors';
import AppButton from '../components/AppButton';

// Determine blur radius based on the platform
const blurRadiusValue = Platform.OS === 'android' ? 0.7 : 2.0;

// Define the WelcomeScreen component
function WelcomeScreen({ navigation }) {
  return (
    <AppScreen>
      <ImageBackground
        source={require("../assets/image.png")}
        style={styles.background}
        blurRadius={blurRadiusValue}
      >
        <View style={styles.welcomeContainer}>
          <MaterialCommunityIcons
            name="charity"
            size={80}
            color={AppColors.color1}
          />
          <AppText>Charity Spots</AppText>
        </View>

        <View style={styles.buttonsContainer}>
          <AppButton
            title='Login'
            color='color2'
            onPress={() => navigation.navigate("Login")}
          />
          <AppButton
            title='Register'
            color='color1'
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </ImageBackground>
    </AppScreen>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  welcomeContainer: {
    backgroundColor: AppColors.secondaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90,
  },
  buttonsContainer: {
    marginTop: 350,
    marginStart: 100,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 150,
    width: '50%',
  },
});

export default WelcomeScreen;
