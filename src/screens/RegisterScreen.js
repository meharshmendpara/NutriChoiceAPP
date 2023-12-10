import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { nameValidator } from "../helpers/nameValidator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    // Prepare the payload for the API request
    const apiPayload = {
      email: email.value,
      password: password.value,
      name: name.value,
    };

    // Make the API request
    fetch("https://nutrichoice.onrender.com/api/v1/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiPayload),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the API response
        console.log("API Response:", data);
        // Store the response data in AsyncStorage
        AsyncStorage.setItem("login", JSON.stringify(data))
          .then(() => {
            console.log("API Response stored in AsyncStorage");
          })
          .catch((error) => {
            console.error("Error storing API response:", error);
          });

        // Assuming the API response includes a success status
        if (data.result === 0) {
          // Navigate to the dashboard or wherever you want to go
          navigation.reset({
            index: 0,
            routes: [{ name: "TabNavDashboard" }],
          });
        } else {
          // Handle unsuccessful registration, perhaps show an error message
          // You can set an error state here if needed
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        // Handle error, perhaps show an error message to the user
      });
  };

  return (
    <Background>
      {/* <BackButton goBack={navigation.goBack} /> */}
      <Logo />
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
