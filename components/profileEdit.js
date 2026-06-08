import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileImage } from '../redux/actions';
import { saveProfileImage } from '../utils/storage';

const ProfileEdit = () => {
  const profileImage = useSelector(state => state.profileImage);
  const dispatch = useDispatch();

  const handleEditProfilePic = async () => {
    Alert.alert('Update Profile Picture', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.errorCode === 'camera_unavailable' || response.errorCode === 'permission') {
              Alert.alert('Permission Denied', 'Camera permission is required to update profile picture.');
            } else if (response.assets && response.assets.length > 0) {
              const uri = response.assets[0].uri;
              dispatch(setProfileImage(uri));
              saveProfileImage(uri);
            }
          });
        }
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.errorCode === 'permission') {
              Alert.alert('Permission Denied', 'Camera permission is required to update profile picture.');
            } else if (response.assets && response.assets.length > 0) {
              const uri = response.assets[0].uri;
              dispatch(setProfileImage(uri));
              saveProfileImage(uri);
            }
          });
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  return (
    <View style={styles.imageContainer}>
      {profileImage ? (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      ) : (
        <Image source={require('./images/avatar.jpeg')} style={styles.profileImage} />
      )}
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfilePic}>
        <Icon name="pencil" size={16} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007BFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007BFF',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F8F9FA',
  },
});

export default ProfileEdit;
