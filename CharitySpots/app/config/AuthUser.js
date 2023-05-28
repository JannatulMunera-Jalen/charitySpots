import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthUser {
  static async register(user) {
    try {
      // Check if 'users' data exists in AsyncStorage
      const userExist = await AsyncStorage.getItem('users');
      let users = userExist ? JSON.parse(userExist) : [];

      // Add the new user to the existing list of users
      users.push(user);

      // Store the updated list of users in AsyncStorage
      await AsyncStorage.setItem('users', JSON.stringify(users));
      
      // Store the registered user as the 'pastUser'
      await AsyncStorage.setItem('pastUser', JSON.stringify(user));

      return true; // Registration successful
    } catch (error) {
      console.error(error);
      return false; // Registration failed
    }
  }

  static async login(email, password) {
    try {
      const emailTest = 'dr@aria.com';
      const passTest = 'test123';

      // Check if the provided email and password match the test user
      if (email === emailTest && password === passTest) {
        const userTest = { email: emailTest, password: passTest, fullname: 'Dr. Aria' };

        // Store the test user as the 'pastUser'
        await AsyncStorage.setItem('pastUser', JSON.stringify(userTest));

        return true; // Login successful
      } else {
        console.log('Test User INVALID');
      }

      // Check if 'users' data exists in AsyncStorage
      const users = await AsyncStorage.getItem('users');
      const parseUser = JSON.parse(users);

      if (parseUser) {
        // Find a user with matching email and password
        const userMatch = parseUser.find((user) => user.email === email && user.password === password);

        if (userMatch) {
          // Store the matched user as the 'pastUser'
          await AsyncStorage.setItem('pastUser', JSON.stringify(userMatch));

          return true; // Login successful
        } else {
          return false; // Login failed (no user match)
        }
      } else {
        return false; // Login failed (no users stored)
      }
    } catch (error) {
      console.error(error);
      return false; // Login failed
    }
  }

  static async getPastUser() {
    try {
      // Retrieve the 'pastUser' from AsyncStorage
      const pastUser = await AsyncStorage.getItem('pastUser');
      console.log(`Pastuser: ${pastUser}`);

      return JSON.parse(pastUser);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export default AuthUser;
