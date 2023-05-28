import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

function AppScreen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {/* Create a padding view to add padding around the children */}
      <View style={styles.paddingView}>
        {children}
      </View>
    </SafeAreaView>
  );
}

// Styles for the AppScreen component
const styles = StyleSheet.create({
  // Screen styles: styles the main screen container
  screen: {
    flex: 1,
    // marginTop: Constants.statusBarHeight, // Uncomment this line if you want to include the status bar height as margin
  },
  // Padding view styles: adds padding around the children components
  paddingView: {
    flex: 1,
    // padding: 20, // Uncomment this line if you want to add padding to the view
  },
});

export default AppScreen;
