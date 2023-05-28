import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppColors from "../config/AppColors";
import AppText from "./AppText";

function AppListItems({ image, title, subtitle, IconComponent, onPress, onSwipeLeft }) {
  return (
    <GestureHandlerRootView style={styles.test}>
      {/* Render a swipeable view */}
      <Swipeable renderRightActions={onSwipeLeft}>
        <TouchableHighlight onPress={onPress} underlayColor={AppColors.color6}>
          {/* Container view for the list item */}
          <View style={styles.container}>
            {/* Display the provided IconComponent */}
            {IconComponent}
            {/* Display the image if available */}
            {image && <Image source={image} style={styles.Image} />}
            {/* Container view for the text */}
            <View style={styles.textContainer}>
              {/* Display the title */}
              <AppText style={styles.title}>{title}</AppText>
              {/* Display the subtitle if available */}
              {subtitle && <AppText style={styles.subtitle}>{subtitle}</AppText>}
            </View>
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

// Styles for the AppListItems component
const styles = StyleSheet.create({
  // Container styles: aligns the text and image in a row
  container: {
    flexDirection: "row",
    padding: 10,
  },
  // Image styles: styles the images
  Image: {
    height: 75,
    width: 75,
    borderRadius: 40,
    marginLeft: 20,
  },
  // Text container styles: aligns just the text
  textContainer: {
    flexDirection: "column",
    marginLeft: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: 5,
  },
  subtitle: {
    fontSize: 20,
  },
  test: {
    // Empty style property
  },
});

export default AppListItems;
