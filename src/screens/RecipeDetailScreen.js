import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { CachedImage } from "../helperImage/image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/loading";
import YouTubeIframe from "react-native-youtube-iframe";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { Platform } from "react-native";
import * as Linking from "expo-linking";

const ios = Platform.OS == "ios";

export default function RecipeDetailScreen(props) {
  let item = props.route.params;
  const [isFavourite, setIsFavourite] = useState(false);
  const navigation = useNavigation();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      //   console.log('got meal data: ',response.data);
      if (response && response.data) {
        setMeal(response.data.meals[0]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err.message);
    }
  };

  const [isNutritionTapped, setIsNutritionTapped] = useState(false);
  const [nutritionInfo, setNutritionInfo] = useState({
    protein: "15g",
    fat: "8g",
    carbs: "20g",
    water: "50ml",
  });

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  const handleOpenLink = (url) => {
    Linking.openURL(url);
  };

  const NutritionRound = ({ label, value }) => {
    return (
      <View className="flex items-center py-2 space-y-1">
        <View
          style={{
            backgroundColor: "#fbbf24", // Use the desired background color
            borderRadius: hp(6.5), // Adjust the border radius as needed
            padding: hp(2), // Adjust the padding as needed
          }}
        >
          <Text
            style={{ fontSize: hp(2), color: "white" }}
            className="font-bold text-neutral-700"
          >
            {value}
          </Text>
        </View>
        <Text
          style={{ fontSize: hp(1.3), color: "white" }}
          className="font-bold text-neutral-700"
        >
          {label}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white relative">
      <StatusBar style={"light"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* recipe image */}
        <View className="flex-row justify-center">
          <CachedImage
            uri={item.strMealThumb}
            // sharedTransitionTag={item.strMeal} // this will only work on native image (now using Image from expo-image)
            style={{
              width: wp(100),
              height: hp(50),
              borderBottomLeftRadius: 40,
              borderBottomRightRadius: 40,
            }}
          />
        </View>

        {/* back button */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="w-full absolute flex-row justify-between items-center pt-14"
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-full ml-5 bg-white"
          >
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsFavourite(!isFavourite)}
            className="p-2 rounded-full mr-5 bg-white"
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavourite ? "red" : "gray"}
            />
          </TouchableOpacity>
        </Animated.View>

        {/* meal description */}
        {loading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="px-4 flex justify-between space-y-4 pt-8">
            {/* name and area */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              className="space-y-2"
            >
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold flex-1 text-neutral-700"
              >
                {meal?.strMeal}
              </Text>
              <Text
                style={{ fontSize: hp(2) }}
                className="font-medium flex-1 text-neutral-500"
              >
                {meal?.strArea}
              </Text>
            </Animated.View>

            {/* misc */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    103
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Cal
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* add nutrition text */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
            >
              <View>
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold text-neutral-700"
                >
                  Nutritions Information
                </Text>
              </View>
            </Animated.View>

            {/* nutrition */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Image
                    source={require("../assets/protein.png")}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    50 g
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Protein
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Image
                    source={require("../assets/trans-fat.png")}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    20.7 g
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Fat
                  </Text>
                </View>
              </View>
              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Image
                    source={require("../assets/starch.png")}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    34 g
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Carbs
                  </Text>
                </View>
              </View>

              <View className="flex rounded-full bg-amber-300 p-2">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="bg-white rounded-full flex items-center justify-center"
                >
                  <Image
                    source={require("../assets/vegetable.png")}
                    style={{ height: hp(4), width: hp(4) }}
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    27 g
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Fiber
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Ingredients
              </Text>
              <View className="space-y-2 ml-3">
                {ingredientsIndexes(meal).map((i) => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="bg-amber-300 rounded-full"
                      />
                      <View className="flex-row space-x-2">
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-extrabold text-neutral-700"
                        >
                          {meal["strMeasure" + i]}
                        </Text>
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-medium text-neutral-600"
                        >
                          {meal["strIngredient" + i]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
            {/* instructions */}

            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-700"
              >
                Instructions
              </Text>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                {meal?.strInstructions}
              </Text>
            </Animated.View>

            {/* recipe video */}

            {meal.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="space-y-4"
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="font-bold flex-1 text-neutral-700"
                >
                  Recipe Video
                </Text>
                <View>
                  {/* YoutubeIfram uses webview and it does not work properly on android (until its fixed we'll just show the video on ios) */}
                  {ios ? (
                    <YouTubeIframe
                      webViewProps={{
                        overScrollMode: "never", // a fix for webview on android - which didn't work :(
                      }}
                      videoId={getYoutubeVideoId(meal.strYoutube)}
                      height={hp(30)}
                    />
                  ) : (
                    <TouchableOpacity
                      className="mb-5"
                      onPress={() => handleOpenLink(meal.strYoutube)}
                    >
                      <Text
                        className="text-blue-600"
                        style={{ fontSize: hp(2) }}
                      >
                        {meal.strYoutube}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
