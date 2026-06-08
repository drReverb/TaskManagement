import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/FontAwesome';

const NetInfoComponent = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // state.isConnected can be null initially, we default to true to prevent flash
      if (state.isConnected !== null) {
        setIsConnected(state.isConnected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const checkConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });
  };

  if (isConnected) return null;

  return (
    <View style={styles.overlay}>
      <Icon name="wifi" size={60} color="#fff" style={styles.icon} />
      <Text style={styles.title}>No Internet Connection</Text>
      <Text style={styles.subtitle}>Please check your connection and try again.</Text>
      <TouchableOpacity style={styles.button} onPress={checkConnection}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    padding: 20,
    elevation: 10,
  },
  icon: {
    marginBottom: 20,
    opacity: 0.8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NetInfoComponent;
