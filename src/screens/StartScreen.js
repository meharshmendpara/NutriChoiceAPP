import React from "react";
import { StatusBar } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function StartScreen({ navigation }) {
  React.useEffect(() => {
    // Check if the user is authenticated
    checkAuthenticationStatus();
  }, []);

  const checkAuthenticationStatus = async () => {
    const isUserAuthenticated = await AsyncStorage.getItem("login");

    if (JSON.parse(isUserAuthenticated)?.payload?.token) {
      // If the user is authenticated, navigate to TabDashboard
      navigation.reset({
        index: 0,
        routes: [{ name: "TabNavDashboard" }],
      });
    }
  };
  return (
    <Background>
      <Logo />
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Header>Welcome to NutriChoice</Header>
      <Paragraph>
        Discover delicious and healthy recipes tailored to your nutritional
        preferences.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate("RegisterScreen")}
      >
        Sign Up
      </Button>
    </Background>
  );
}
