import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useIsFocused } from '@react-navigation/native';

import AppTextInput from './components/AppTextInput';
import AppColors from './config/AppColors';
import GroupDataManager from './config/GroupDataManager';

export default function CharityList({ navigation }) {
  // State variables
  const [groups, setGroups] = useState([]);
  const [displayedGroups, setDisplayedGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log("CharityList!")
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  // Load data from GroupDataManager
  const loadData = async () => {
    const allGroups = await GroupDataManager.getAllGroups();
    console.log(`all groups: ${allGroups}`);
    const filteredGroups = allGroups.filter(group =>
      group.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setGroups(allGroups);
    setDisplayedGroups(filteredGroups);
  };

  // Render each group item
  const renderGroupItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard', {
      isNew: false,
      group: item
    })}>
      <View style={styles.card}>
        <Text style={styles.groupTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  // Handle search query change
  const handleSearchQueryChange = query => {
    setSearchQuery(query);
    const filteredGroups = groups.filter(group =>
      group.title.toLowerCase().includes(query.toLowerCase())
    );
    setDisplayedGroups(filteredGroups);
  };

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <View style={styles.searchContainer}>
        <AppTextInput
          icon="magnify"
          placeholder="Search"
          value={searchQuery}
          onChangeText={handleSearchQueryChange}
        />
      </View>

      {/* Display groups */}
      {displayedGroups.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't created any collections</Text>
        </View>
      ) : (
        <FlatList
          data={displayedGroups}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGroupItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Create New Group */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.push('Dashboard', {
            group: {
              id: uuid.v4(),
              title: "New Group",
              items: [],
            },
            isNew: true
          })
        }
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.primaryColor,
    padding: 20,
    justifyContent: 'center',
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    marginVertical: 5,
    marginLeft: 5,
    marginRight: 5,
    elevation: 2,
    backgroundColor: AppColors.color6,
    borderRadius: 15,
    padding: 10,
    shadowColor: AppColors.color1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  groupTitle: {
    fontSize: 24,
    margin: 10,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: AppColors.color6,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: AppColors.color1,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 32,
    marginBottom: 5,
    marginLeft: 1,
    color: AppColors.color1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: AppColors.color1,
  },
  searchContainer: {
    marginBottom: 10,
  },
});

// Configure navigation options for the CharityList screen
CharityList.navigationOptions = {
  headerLeft: () => {
    return null;
  },
};
