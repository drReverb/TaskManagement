import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/actions';
import { saveTasks } from '../utils/storage';
import Layout from './Layout';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskAsign = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState('Low');
  const [assignedTo, setAssignedTo] = useState('Hari');
  const [status, setStatus] = useState('Pending');

  const users = ['Hari', 'John', 'David', 'Sarah', 'Michael'];

  const handleImagePick = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Camera',
        onPress: () => {
          launchCamera({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.assets && response.assets.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        }
      },
      {
        text: 'Gallery',
        onPress: () => {
          launchImageLibrary({ mediaType: 'photo', quality: 0.5 }, response => {
            if (response.assets && response.assets.length > 0) {
              setImageUri(response.assets[0].uri);
            }
          });
        }
      },
      { text: 'Cancel', style: 'cancel' }
    ]);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      if (selectedDate < new Date().setHours(0,0,0,0)) {
        Alert.alert('Invalid Date', 'Please select a future date.');
      } else {
        setDueDate(selectedDate);
      }
    }
  };

  const handleSave = () => {
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Task description is required.');
      return;
    }

    const newTask = {
      id: Date.now(),
      description,
      image: imageUri,
      dueDate: dueDate.toISOString(),
      assignedTo,
      priority,
      status,
      createdDate: new Date().toISOString()
    };

    const updatedTasks = [...tasks, newTask];
    
    // Dispatch and Save
    dispatch(addTask(newTask));
    saveTasks(updatedTasks);

    // Reset Form
    setDescription('');
    setImageUri(null);
    setDueDate(new Date());
    setPriority('Low');
    setAssignedTo('Hari');
    setStatus('Pending');

    // Navigate to Task List
    navigation.navigate('Task List');
  };

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          <Text style={styles.label}>Task Description *</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter task description..."
            multiline
            maxLength={250}
            value={description}
            onChangeText={setDescription}
          />
          <Text style={styles.charCount}>{description.length}/250</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Attachment</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={handleImagePick}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Icon name="camera" size={30} color="#ccc" />
                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Reminder Date</Text>
          <TouchableOpacity style={styles.datePickerBtn} onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar" size={16} color="#555" />
            <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Priority</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}
            >
              <Picker.Item label="Low" value="Low" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="High" value="High" />
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Assigned To</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={assignedTo}
              onValueChange={(itemValue) => setAssignedTo(itemValue)}
            >
              {users.map(user => (
                <Picker.Item key={user} label={user} value={user} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={status}
              onValueChange={(itemValue) => setStatus(itemValue)}
            >
              <Picker.Item label="Pending" value="Pending" />
              <Picker.Item label="Done" value="Done" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  charCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    borderStyle: 'dashed',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  imagePlaceholder: {
    alignItems: 'center',
  },
  imagePlaceholderText: {
    marginTop: 8,
    color: '#888',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  datePickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fafafa',
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TaskAsign;
