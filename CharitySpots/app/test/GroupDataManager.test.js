// Import AsyncStorage for storing data
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import the GroupDataManager class that contains methods for managing groups
import GroupDataManager from '../config/GroupDataManager';

// Mock AsyncStorage methods for testing
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),    // Mock getItem method
  setItem: jest.fn(),    // Mock setItem method
}));

// Start the test suite for the GroupDataManager class
describe('GroupDataManager', () => {
  // Reset AsyncStorage mocks before each test case
  beforeEach(() => {
    AsyncStorage.getItem.mockReset();
    AsyncStorage.setItem.mockReset();
  });

  // Test case for the getAllGroups method
  test('getAllGroups should return the parsed json from AsyncStorage', async () => {
    const mockGroups = [{ id: '1', name: 'test' }];

    // Mock the AsyncStorage getItem method to return the mockGroups array as a string
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockGroups));

    // Call the getAllGroups method and store the result
    const result = await GroupDataManager.getAllGroups();

    // Verify that the result matches the mockGroups array
    expect(result).toEqual(mockGroups);
  });

  // Test case for the setAllGroups method
  test('setAllGroups should stringify the groups and save in AsyncStorage', async () => {
    const mockGroups = [{ id: '1', name: 'test' }];

    // Call the setAllGroups method with the mockGroups array
    await GroupDataManager.setAllGroups(mockGroups);

    // Get the storage key based on the logged-in user's email or default key
    const storageKey = await GroupDataManager.getUserStorageKey();

    // Verify that the AsyncStorage setItem method is called with the correct storage key and stringified mockGroups array
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify(mockGroups));
  });

  // Test case for the addGroup method
  test('addGroup should add group to the existing groups in AsyncStorage', async () => {
    const mockGroups = [{ id: '1', name: 'test' }];
    const newGroup = { id: '2', name: 'new test' };

    // Mock the AsyncStorage getItem method to return the mockGroups array as a string
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockGroups));

    // Call the addGroup method with the newGroup object
    await GroupDataManager.addGroup(newGroup);

    // Get the storage key based on the logged-in user's email or default key
    const storageKey = await GroupDataManager.getUserStorageKey();

    // Verify that the AsyncStorage setItem method is called with the correct storage key and updated groups array
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify([...mockGroups, newGroup]));
  });

  // Test case for the removeGroup method
  test('removeGroup should remove group from the existing groups in AsyncStorage', async () => {
    const mockGroups = [{ id: '1', name: 'test' }, { id: '2', name: 'new test' }];

    // Mock the AsyncStorage getItem method to return the mockGroups array as a string
    AsyncStorage.getItem.mockResolvedValue(JSON.stringify(mockGroups));

    // Call the removeGroup method with the groupId '1'
    await GroupDataManager.removeGroup('1');

    // Get the storage key based on the logged-in user's email or default key
    const storageKey = await GroupDataManager.getUserStorageKey();

    // Verify that the AsyncStorage setItem method is called with the correct storage key and updated groups array
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(storageKey, JSON.stringify([{ id: '2', name: 'new test' }]));
  });
});
