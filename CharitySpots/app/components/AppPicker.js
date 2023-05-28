import React, { useState } from "react";
import { View, StyleSheet, Modal, Button, TouchableWithoutFeedback, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppColors from "../config/AppColors";
import AppText from "./AppText";
import AppScreen from "./AppScreen";
import AppPickerItem from "./AppPickerItem";

function AppPicker({ data, icon, placeholder, selectedItem, onSelectItem }) {
  // State for managing the visibility of the modal
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      {/* Touchable area for opening the modal */}
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.container}>
          {/* Icon displayed on the left side */}
          {icon && <MaterialCommunityIcons name={icon} size={30} padding={10} />}
          {/* Text displaying the selected item or the placeholder */}
          <AppText style={styles.text}>{selectedItem ? selectedItem.label : placeholder}</AppText>
          {/* Chevron down icon */}
          <MaterialCommunityIcons name="chevron-down" size={30} padding={10} />
        </View>
      </TouchableWithoutFeedback>
      {/* Modal for displaying the item list */}
      <Modal visible={modalVisible} animationType="slide">
        <AppScreen>
          {/* Close button for closing the modal */}
          <Button title="Close" onPress={() => setModalVisible(false)} />
          {/* FlatList for rendering the item list */}
          <FlatList
            data={data}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <AppPickerItem
                onPress={() => {
                  setModalVisible(false);
                  onSelectItem(item);
                }}
                label={item.label}
                icon={item.icon}
                backgroundColor={item.backgroundColor}
              />
            )}
          />
        </AppScreen>
      </Modal>
    </>
  );
}

// Styles for the AppPicker component
const styles = StyleSheet.create({
  // Container styles: styles the main container
  container: {
    backgroundColor: AppColors.color5,
    flexDirection: "row",
    borderRadius: 25,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  // TextInput styles: styles the text input
  textInput: {
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Cochin",
    color: "#000",
    marginLeft: 10,
    flex: 1,
  },
  // Text styles: styles the text displaying the selected item or placeholder
  text: {
    flex: 1,
    padding: 10,
    fontSize: 30,
    justifyContent: "center",
  },
  // Empty style property
  test: {},
});

export default AppPicker;
