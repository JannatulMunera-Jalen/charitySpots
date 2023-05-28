// Import necessary components and modules
import React, { useState } from "react";
import { StyleSheet, FlatList, View, TouchableOpacity } from "react-native";

import AppListItems from "../components/AppListItems";
import AppScreen from "../components/AppScreen";
import AppColors from "../config/AppColors";
import AppIcon from "../components/AppIcon";

// Define the initial list of organizations
const initialOrgList = [
  {
    id: 1,
    name: "Red Cross",
    image: require("../assets/redCross.jpg"),
  },
  {
    id: 2,
    name: "UNICEF",
    image: require("../assets/unicef.png"),
  },
];

// Define the OrganisationScreen component
function OrganisationScreen(props) {
  // State variables
  const [refreshing, setRefreshing] = useState(false);
  const [orgs, setOrgs] = useState(initialOrgList);

  // Function to handle organization deletion
  const handleDelete = (org) => {
    const newOrgList = orgs.filter(item => item.id !== org.id);
    setOrgs(newOrgList);
  }

  // Render the OrganisationScreen component
  return (
    <AppScreen style={styles.container}>
      <FlatList
        data={orgs}
        keyExtractor={org => org.id.toString()}
        refreshing={refreshing}
        onRefresh={() => setOrgs(initialOrgList)}
        renderItem={({ item }) =>
          <AppListItems
            title={item.name}
            image={item.image}
            onPress={() => console.log(item)}
            onSwipeLeft={() => (
              <View style={styles.deleteView}>
                <TouchableOpacity onPress={() => handleDelete(item)}>
                  <AppIcon name="trash-can" iconColor={AppColors.black} />
                </TouchableOpacity>
              </View>
            )}
          />}
        ItemSeparatorComponent={() => <View style={styles.seperator} />}
      />
    </AppScreen>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.primaryColor,
    flex: 1,
  },
  seperator: {
    width: "100%",
    height: 2,
    backgroundColor: AppColors.color2,
  },
  deleteView: {
    backgroundColor: AppColors.red,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrganisationScreen;
