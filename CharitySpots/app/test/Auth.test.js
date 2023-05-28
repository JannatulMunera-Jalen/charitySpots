import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthUser from '../config/AuthUser';

// Mocking AsyncStorage methods using Jest mock
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('AuthUser', () => {
  // Clear mocked AsyncStorage methods after each test
  afterEach(() => {
    AsyncStorage.getItem.mockClear();
    AsyncStorage.setItem.mockClear();
  });

  describe('register', () => {
    it('add new user and return true', async () => {
      // Mock the return value of AsyncStorage.getItem to an empty array
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([]));

      const user = { email: 'dr@aria.com', password: 'test123' };
      const result = await AuthUser.register(user);

      // Verify that AsyncStorage.getItem was called with 'users'
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('users');
      // Verify that AsyncStorage.setItem was called with 'users' and the updated user array
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify([user]));
      // Verify that the result is true, indicating successful registration
      expect(result).toBe(true);
    });
  });

  describe('login', () => {
    it('log in with valid test user and return true', async () => {
      const email = 'dr@aria.com';
      const password = 'test123';
      const testUser = {
        email,
        password,
        fullname: 'Test User',
      };

      // Attempt to log in with the provided email and password
      const result = await AuthUser.login(email, password);

      // Verify that the result is true, indicating successful login
      expect(result).toBe(true);
    });

    it('Must Not log in with a non-matching test user and return false', async () => {
      const email = 'meow@example.com';
      const password = 'password';

      // Attempt to log in with a non-matching email and password
      const result = await AuthUser.login(email, password);
      // Verify that the result is false, indicating login failure
      expect(result).toBe(false);
    });

    it('Must log in with a matching user and return true', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const matchedUser = { email, password };

      // Mock the return value of AsyncStorage.getItem to contain the matched user
      AsyncStorage.getItem.mockResolvedValue(JSON.stringify([matchedUser]));

      // Attempt to log in with the provided email and password
      const result = await AuthUser.login(email, password);

      // Verify that the result is true, indicating successful login
      expect(result).toBe(true);
    });
  });
});
