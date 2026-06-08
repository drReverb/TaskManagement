import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_KEY = 'TASKS';
const PROFILE_IMAGE_KEY = 'PROFILE_IMAGE';

export const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(TASKS_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving tasks to AsyncStorage', e);
  }
};

export const loadTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TASKS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading tasks from AsyncStorage', e);
    return [];
  }
};

export const saveProfileImage = async (uri) => {
  try {
    if (uri) {
      await AsyncStorage.setItem(PROFILE_IMAGE_KEY, uri);
    } else {
      await AsyncStorage.removeItem(PROFILE_IMAGE_KEY);
    }
  } catch (e) {
    console.error('Error saving profile image to AsyncStorage', e);
  }
};

export const loadProfileImage = async () => {
  try {
    const uri = await AsyncStorage.getItem(PROFILE_IMAGE_KEY);
    return uri;
  } catch (e) {
    console.error('Error loading profile image from AsyncStorage', e);
    return null;
  }
};
