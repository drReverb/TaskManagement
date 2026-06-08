import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Provider, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import store from './redux/store';
import { loadTasks, setProfileImage } from './redux/actions';
import { loadTasks as fetchTasksFromStorage, loadProfileImage } from './utils/storage';

import TaskAsign from './components/taskAsign';
import TaskList from './components/TaskList';
import ProfileMenu from './components/profileMenu';
import NetInfoComponent from './components/netInfo';

const Tab = createBottomTabNavigator();

const AppContent = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      const storedTasks = await fetchTasksFromStorage();
      const storedImage = await loadProfileImage();
      
      dispatch(loadTasks(storedTasks));
      if (storedImage) {
        dispatch(setProfileImage(storedImage));
      }
      setLoading(false);
    };

    initializeData();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <>
      <NetInfoComponent />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Create Task') {
                iconName = 'plus-circle';
              } else if (route.name === 'Task List') {
                iconName = 'list-ul';
              } else if (route.name === 'Profile') {
                iconName = 'user';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007BFF',
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 1,
              borderBottomColor: '#f0f0f0',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#333',
            },
            tabBarStyle: {
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            }
          })}
        >
          <Tab.Screen name="Task List" component={TaskList} />
          <Tab.Screen name="Create Task" component={TaskAsign} />
          <Tab.Screen name="Profile" component={ProfileMenu} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
