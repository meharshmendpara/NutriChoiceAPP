import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [editableEmail, setEditableEmail] = useState("darshit@gmail.com");
  const [userData, setUserData] = useState();
  const [state, setState] = useState();
  const [editableLocation, setEditableLocation] = useState("Regina, SK");
  const [editableBio, setEditableBio] = useState("This is my bio");
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmission = async () => {
    try {
      // Prepare the payload with the updated user data
      const updatedUserData = {
        email: editableEmail,
        location: editableLocation,
        bio: editableBio,
      };

      // Make a PUT request to the server
      const response = await axios.put(
        `https://nutrichoice.onrender.com/api/v1/admin/update/${state?.userLogin.admin?._id}`,
        updatedUserData
      );

      // Handle the API response
      console.log("API Response:", response.data);

      // Switch to edit mode after successful submission
      setIsEditing(!isEditing);
    } catch (error) {
      console.error("API Error:", error.message);
      // Handle error, perhaps show an error message to the user
    }
  };

  const getUser = async (userId) => {
    try {
      console.log(userId);
      // Make a GET request to the server
      const response =
        state?.userLogin.admin?._id &&
        (await axios.get(
          `https://nutrichoice.onrender.com/api/v1/admin/get-admin?id=${state?.userLogin?.admin?._id}`
        ));

      // Handle the API response
      console.log("@@@@@@@@@@@User Details:", response.data);

      // Set the user data in the state
      setUserData(response.data);
    } catch (error) {
      console.error("API Error:", error.message);
      // Handle error, perhaps show an error message to the user
    }
  };

  const getUserIdFromLocalStorage = async () => {
    // Retrieve user ID from local storage
    let userId = await AsyncStorage.getItem("login");
    userId =
      userId && typeof userId === "string"
        ? JSON.parse(userId).payload
        : userId.payload;
    setState({
      ...state,
      userLogin: userId,
      email: state?.userLogin.admin?.email,
      id: state?.userLogin.admin?._id,
      name: state?.userLogin.admin?.name,
      country: state?.userLogin.admin?.country,
    });
    setEditableEmail(state?.userLogin.admin?.email);
    setEditableLocation(state?.userLogin.admin?.country);
    setEditableBio(state?.userLogin?.aboutMe)
  };

  React.useEffect(() => {
    getUserIdFromLocalStorage();
    getUser();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* back button and favourite button */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile content */}
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../assets/images/avatar.png")}
          style={styles.avatar}
        />
        <Text style={styles.name}>{state?.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Email:</Text>
        <TextInput
          style={[
            styles.editableInfoValue,
            isEditing ? styles.editable : null, // Conditional styles for editable mode
          ]}
          value={editableEmail}
          placeholder="Please enter email address"
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
          placeholder="Please enter location"
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
          placeholder="Please enter bio"
          value={editableBio}
          onChangeText={(text) => setEditableBio(text)}
          multiline
          editable={isEditing} // Enable/disable editing based on the mode
        />
      </View>

      {/* Edit/Submit button */}
      <TouchableOpacity
        onPress={isEditing ? handleSubmission : () => setIsEditing(true)}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>
          {isEditing ? "Submit" : "Edit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 20,
    paddingTop: 70,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 7,
    borderRadius: 50,
    backgroundColor: "#fbbf24",
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 5,
    backgroundColor: "#fbbf24",
    borderRadius: 50,
    borderColor: "#FBC539",
  },
  avatar: {
    top: 5,
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    fontWeight: "bold",
    marginTop: 10,
    color: "black",
  },
  infoContainer: {
    marginTop: 20,
  },
  infoLabel: {
    fontSize: hp(3),
    fontWeight: "bold",
  },
  editableInfoValue: {
    fontSize: hp(2.5),
    marginTop: 5,
    borderRadius: 5,
    padding: 5,
    color: "black",
  },
  editable: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "gray",
  },
  editableTextArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: "#fbbf24",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});

export default ProfileScreen;
