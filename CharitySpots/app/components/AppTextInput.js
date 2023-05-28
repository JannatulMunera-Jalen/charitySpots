import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppColors from '../config/AppColors';

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={24} />}
      <TextInput style={styles.textInput} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  // container: styles the container view for the text input
  container: {
    backgroundColor: AppColors.color5,
    flexDirection: 'row',
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    width: '100%',
  },
  // textInput: styles the text input component
  textInput: {
    fontSize: 20,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Cochin',
    color: '#000',
    marginLeft: 10,
    flex: 1,
  },
});

export default AppTextInput;
