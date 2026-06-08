import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Layout from './Layout';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileEdit from './profileEdit';

const ProfileMenu = () => {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Icon name="arrow-left" size={20} color="#333" />
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 20 }} />
        </View>

        <View style={styles.profileSection}>
          <ProfileEdit />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>

        <View style={styles.menuSection}>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="user" size={20} color="#007BFF" style={styles.menuIcon} />
              <Text style={styles.menuText}>Account</Text>
            </View>
            <Icon name="chevron-right" size={14} color="#ccc" />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="cog" size={20} color="#007BFF" style={styles.menuIcon} />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Icon name="chevron-right" size={14} color="#ccc" />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Icon name="question-circle" size={20} color="#007BFF" style={styles.menuIcon} />
              <Text style={styles.menuText}>Help Center</Text>
            </View>
            <Icon name="chevron-right" size={14} color="#ccc" />
          </View>

          <TouchableOpacity style={[styles.menuItem, styles.clickableItem]}>
            <View style={styles.menuItemLeft}>
              <Icon name="heart" size={20} color="#FF3B30" style={styles.menuIcon} />
              <Text style={styles.menuText}>Favorite Currencies</Text>
            </View>
            <Icon name="chevron-right" size={14} color="#ccc" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    marginVertical: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
  },
  userEmail: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  clickableItem: {
    backgroundColor: '#fafafa',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 30,
    textAlign: 'center',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});

export default ProfileMenu;
