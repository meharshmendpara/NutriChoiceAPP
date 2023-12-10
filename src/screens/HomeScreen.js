import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import Recipes from "../components/recipes";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [state, setState] = useState({});
  const getData = async () => {
    let isUserAuthenticated = await AsyncStorage.getItem("login");
    isUserAuthenticated =
      isUserAuthenticated && typeof isUserAuthenticated == "string"
        ? JSON.parse(isUserAuthenticated).payload
        : isUserAuthenticated?.payload;
    setState({
      ...state,
      userLogin: isUserAuthenticated,
    });
  };
  useEffect(() => {
    getData();
    getCategories();
    getRecipes();
  }, []);

  const navigation = useNavigation();

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      if (response && response.data && response.data.meals) {
        const searchedMeals = response.data.meals;
        setMeals(searchedMeals.length > 0 ? searchedMeals : []);
      } else {
        // No data available
        setMeals([]);
      }
    } catch (err) {
      console.log("error: ", err.message);
      // Handle the error, you can display an error message or log it
      // For now, setting meals to an empty array
      setMeals([]);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          {/* <BellIcon size={hp(4)} color="white" /> */}
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello,{state?.userLogin?.admin?.name ?? "User"}{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
            <Image
              source={require("../../assets/images/avatar.png")}
              style={{ height: hp(5), width: hp(5.5) }}
            />
          </TouchableOpacity>
        </View>

        {/* greetings and punchline */}
        <View className="mx-4 space-y-2 mb-2">
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor="gray"
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />
          <View className="bg-white rounded-full p-3" onTouchEnd={handleSearch}>
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>

        {/* recipes */}
        <View>
          <Recipes meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
