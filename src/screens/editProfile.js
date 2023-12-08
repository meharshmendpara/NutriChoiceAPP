import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [editableEmail, setEditableEmail] = useState('darshit@gmail.com');
  const [editableLocation, setEditableLocation] = useState('Regina, SK');
  const [editableBio, setEditableBio] = useState('This is my bio');
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmission = () => {
    // Handle the submission logic here
    // You can send the updated data to a server or perform any other action
    // For now, let's just log the updated values
    console.log('Updated Email:', editableEmail);
    console.log('Updated Location:', editableLocation);
    console.log('Updated Bio:', editableBio);
    // Switch to edit mode after submission
    setIsEditing(!isEditing);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* back button and favourite button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile content */}
      <View style={styles.avatarContainer}>
        <Image source={require('../../assets/images/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>DARSHIT</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <TextInput
          style={[
            styles.editableInfoValue,
            isEditing ? styles.editable : null, // Conditional styles for editable mode
          ]}
          value={editableEmail}
          onChangeText={(text) => setEditableEmail(text)}
          editable={isEditing} // Enable/disable editing based on the mode
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Location:</Text>
        <TextInput
          style={[
            styles.editableInfoValue,
            isEditing ? styles.editable : null, // Conditional styles for editable mode
          ]}
          value={editableLocation}
          onChangeText={(text) => setEditableLocation(text)}
          editable={isEditing} // Enable/disable editing based on the mode
        />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Bio:</Text>
        <TextInput
          style={[
            styles.editableInfoValue,
            styles.editableTextArea, // Additional styles for multiline text input
            isEditing ? styles.editable : null, // Conditional styles for editable mode
          ]}
          value={editableBio}
          onChangeText={(text) => setEditableBio(text)}
          multiline
          editable={isEditing} // Enable/disable editing based on the mode
        />
      </View>

      {/* Edit/Submit button */}
      <TouchableOpacity onPress={handleSubmission} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>{isEditing ? 'Submit' : 'Edit'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: '#fbbf24',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    borderColor: 'black',
    borderWidth: 5,
    backgroundColor: '#fbbf24',
    borderRadius: 50,
    borderColor: '#FBC539',
  },
  avatar: {
    top: 5,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontSize: hp(3),
    fontWeight: 'bold',
  },
  editableInfoValue: {
    fontSize: hp(2.5),
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
    color: 'black',
  },
  editable: {
    borderWidth: 1,
    borderColor: '#ccc',
    color: 'gray',
  },
  editableTextArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#fbbf24',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: hp(2),
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
