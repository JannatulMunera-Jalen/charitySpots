import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

import AppIcon from './AppIcon';
import AppText from './AppText';

function AppPickerItem({ onPress, label, icon, backgroundColor }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {/* Display the icon */}
      <AppIcon name={icon} iconColor="white" backgroundColor={backgroundColor} />
      {/* Display the label */}
      <AppText style={styles.text}>{label}</AppText>
    </TouchableOpacity>
  );
}

// Styles for the AppPickerItem component
const styles = StyleSheet.create({
  // Container styles: styles the main container
  container: {
    flexDirection: "row",
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  // Text styles: styles the label text
  text: {
    fontSize: 30,
  },
});

export default AppPickerItem;
