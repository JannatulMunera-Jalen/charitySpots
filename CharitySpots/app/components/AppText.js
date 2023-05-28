import React from 'react';
import { Text, StyleSheet, Platform } from 'react-native';

function AppText({ style, children }) {
  return (
    <Text style={[styles.text, style]}> {children} </Text>
  );
}

// Styles for the AppText component
const styles = StyleSheet.create({
  // Text style: styles the text component
  text: {
    fontSize: 40,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Cochin',
    justifyContent: 'center',
  },
});

export default AppText;
