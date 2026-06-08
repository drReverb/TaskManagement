import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask } from '../redux/actions';
import { saveTasks } from '../utils/storage';
import Layout from './Layout';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskList = () => {
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState('Created Date');

  const handleDelete = (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        style: 'destructive',
        onPress: () => {
          const updatedTasks = tasks.filter(t => t.id !== id);
          dispatch(deleteTask(id));
          saveTasks(updatedTasks);
        }
      }
    ]);
  };

  const getSortedTasks = () => {
    let sorted = [...tasks];
    if (sortBy === 'Created Date') {
      sorted.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    } else if (sortBy === 'Due Date') {
      sorted.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortBy === 'Priority') {
      const priorityWeights = { 'High': 3, 'Medium': 2, 'Low': 1 };
      sorted.sort((a, b) => priorityWeights[b.priority] - priorityWeights[a.priority]);
    }
    return sorted;
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)}>
          <Icon name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Icon name="user" size={14} color="#555" />
          <Text style={styles.infoText}>{item.assignedTo}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={14} color="#555" />
          <Text style={styles.infoText}>{new Date(item.dueDate).toLocaleDateString()}</Text>
        </View>
        <View style={styles.infoRow}>
          <Icon name="flag" size={14} color={item.priority === 'High' ? '#FF3B30' : item.priority === 'Medium' ? '#FF9500' : '#34C759'} />
          <Text style={styles.infoText}>{item.priority}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText, item.status === 'Done' ? styles.statusDone : styles.statusPending]}>
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Your Tasks</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={sortBy}
            onValueChange={(itemValue) => setSortBy(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Created Date" value="Created Date" />
            <Picker.Item label="Due Date" value="Due Date" />
            <Picker.Item label="Priority" value="Priority" />
          </Picker>
        </View>
      </View>

      {tasks.length === 0 ? (
        <View style={styles.emptyState}>
          <Icon name="inbox" size={60} color="#ccc" />
          <Text style={styles.emptyStateText}>No tasks found. Create one!</Text>
        </View>
      ) : (
        <FlatList
          data={getSortedTasks()}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
    width: 150,
    height: 40,
    justifyContent: 'center',
    overflow: 'hidden'
  },
  picker: {
    height: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  description: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 10,
  },
  cardBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    marginBottom: 5,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: '#555',
  },
  statusBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 5,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  statusDone: {
    color: '#34C759',
  },
  statusPending: {
    color: '#FF9500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
});

export default TaskList;
