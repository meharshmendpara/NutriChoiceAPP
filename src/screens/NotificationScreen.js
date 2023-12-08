import { View, Text, ScrollView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import NotificationScreen from "../components/notification";
export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

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
  const getRecipes = async (category = "breakfast") => {
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

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        <View>
          <NotificationScreen meals={meals} categories={categories} />
        </View>
      </ScrollView>
    </View>
  );
}
