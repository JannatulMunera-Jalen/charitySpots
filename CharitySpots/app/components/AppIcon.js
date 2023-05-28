import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function AppIcon({ name, size = 40, iconColor = 'black', backgroundColor }) {
  // Render an icon component with customizable properties
  return (
    <View style={{ width: size, height: size, backgroundColor: backgroundColor, borderRadius: size / 2, alignItems: "center", justifyContent: "center" }}>
      {/* Display an icon from the MaterialCommunityIcons library */}
      <MaterialCommunityIcons name={name} size={size - 10} color={iconColor} />
    </View>
  );
}

// Styles for the AppIcon component
const styles = StyleSheet.create({
  // Empty object as no specific styles are defined
});

export default AppIcon;
