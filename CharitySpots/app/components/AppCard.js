// Required React Native imports
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
// Custom file imports
import AppColors from "../config/AppColors";
import AppText from "./AppText";

function AppCard({ category, title, subtitle, image, onSwipeLeft}) {
  // Render a card component that supports swipe gestures
  return (
    <GestureHandlerRootView style={styles.test}>
      {/* Enable swipe actions on the card */}
      <Swipeable renderRightActions={onSwipeLeft}>
        {/* Container view for the card */}
        <View style={styles.container}>
          {/* Display the image, handling local and remote sources */}
          {isFinite(image) ? (
            <Image source={image} style={styles.image} />
          ) : (
            <Image source={{ uri: image }} style={styles.image} />
          )}
          {/* Display the title */}
          <AppText style={styles.title}>{title}</AppText>
          {/* Display the subtitle */}
          <AppText style={styles.subtitle}>{subtitle}</AppText>
          {/* Display the category */}
          <AppText style={styles.category}>{category}</AppText>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
}

// Styles for the AppCard component
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.color6,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 25,
  },
  image: {
    height: 200,
    width: "100%",
    borderRadius: 25,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 0,
    paddingStart: 10,
  },
  subtitle: {
    fontSize: 20,
    marginLeft: 5,
    padding: 10,
  },
  category: {
    fontSize: 20,
    paddingStart: 10,
    fontStyle: "italic",
    fontWeight: "bold",
  },
});

export default AppCard;
