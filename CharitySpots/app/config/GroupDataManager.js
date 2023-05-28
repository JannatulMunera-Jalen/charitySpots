import AsyncStorage from '@react-native-async-storage/async-storage';

class GroupDataManager {
  
  // Retrieves the storage key based on the logged-in user's email or a default key
  static async getUserStorageKey() {
    try {
      const pastUser = await AsyncStorage.getItem('pastUser');
      
      // If a logged-in user exists, use their email to create a personalized storage key
      if (pastUser) {
        const user = JSON.parse(pastUser);
        if (user && user.email) {
          return `charity-groups-${user.email}`;
        }
      }
      
      // If no logged-in user, use the default storage key
      return 'charity-groups';
    } catch (error) {
      console.error(error);
      return 'charity-groups'; // Fallback to default key in case of an error
    }
  }

  // Retrieves all groups from AsyncStorage based on the storage key
  static async getAllGroups() {
    try {
      const storageKey = await GroupDataManager.getUserStorageKey();
      const jsonValue = await AsyncStorage.getItem(storageKey);
      console.log(`Returning Groups!: ${jsonValue}`);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error reading groups:', error);
      return []; // Return an empty array in case of an error
    }
  }

  // Stores all groups in AsyncStorage based on the storage key
  static async setAllGroups(groups) {
    try {
      const jsonValue = JSON.stringify(groups);
      const storageKey = await GroupDataManager.getUserStorageKey();
      console.log(`Saving: ${jsonValue}`);
      await AsyncStorage.setItem(storageKey, jsonValue);
    } catch (error) {
      console.error('Error writing groups:', error);
    }
  }

  // Adds a new group to the existing groups and stores them in AsyncStorage
  static async addGroup(group) {
    try {
      console.log('Add: ',group);
      const groups = await GroupDataManager.getAllGroups();
      groups.push(group);
      await GroupDataManager.setAllGroups(groups);
    } catch (error) {
      console.error('Error adding group:', error);
    }
  }

  // Removes a group with the specified groupId from the existing groups and updates AsyncStorage
  static async removeGroup(groupId) {
    try {
      let groups = await GroupDataManager.getAllGroups();
      groups = groups.filter((group) => group.id !== groupId);
      await GroupDataManager.setAllGroups(groups);
    } catch (error) {
      console.error('Error removing group:', error);
    }
  }

  // Updates an existing group or adds a new group to the existing groups and stores them in AsyncStorage
  static async updateGroup(group) {
    try {
      let groups = await GroupDataManager.getAllGroups();
      const index = groups.findIndex((g) => g.id === group.id);
      if (index !== -1) {
        groups[index] = group; // Update existing group
        await GroupDataManager.setAllGroups(groups);
      } else {
        await GroupDataManager.addGroup(group); // Add new group
      }
    } catch (error) {
      console.error('Error updating group:', error);
    }
  }

  // Finds the next available group name by incrementing a counter until a unique name is found
  static async getNextAvailableGroupName() {
    try {
      const groups = await GroupDataManager.getAllGroups();
      let counter = 1;
      let available = false;
      let groupName = '';

      while (!available) {
        groupName = `New Group ${counter}`;
        const existingGroup = groups.find((group) => group.name === groupName);
        if (!existingGroup) {
          available = true; // Unique name found
        } else {
          counter++; // Increment counter and check the next name
        }
      }

      return groupName;
    } catch (error) {
      console.error('Error finding next available group name:', error);
      return ''; // Return an empty string in case of an error
    }
  }
}

export default GroupDataManager;
