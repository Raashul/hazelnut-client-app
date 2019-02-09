import { AsyncStorage } from 'react-native';

const deviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async loadJWT() {
    try {
      const value = await AsyncStorage.getItem('jwt');
      if(value) {
        return value;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  },

  async deleteJWT() {
    try {
      await AsyncStorage.removeItem('jwt');
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;
