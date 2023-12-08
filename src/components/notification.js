import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './loading';
import { CachedImage } from '../helperImage/image';
import { useNavigation } from '@react-navigation/native';

export default function ExploreNewRecipes({ categories, meals }) {
  const navigation = useNavigation();

  return (
    <View style={{ marginHorizontal: wp(4), marginVertical: hp(3) }}>
      <Text style={{ fontSize: hp(3), fontWeight: 'bold', marginBottom: hp(2) }}>Notifications</Text>

      <Text style={{ fontSize: hp(2), fontWeight: 'bold', marginBottom: hp(2) }}>Today's Notifications</Text>
      <View>
        {
          categories.length === 0 || meals.length === 0 ? (
            <Loading size="large" style={{ marginTop: hp(5) }} />
          ) : (
            <MasonryList
              data={meals}
              keyExtractor={(item) => item.idMeal}
              numColumns={1}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => <RecipeCard item={item} index={index} navigation={navigation} />}
            />
          )
        }
      </View>
    </View>
  );
}
const RecipeCard = ({ item, index, navigation }) => {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
      <Pressable
        style={{
          width: '100%',
          backgroundColor: 'rgba(251, 191, 36, 0.9)', // #fbbf24 with 90% opacity
          borderRadius: hp(4), // Updated border radius to 10 (hp(4) is equivalent to 10% of the screen height)
          overflow: 'hidden',
          marginBottom: hp(2),
          padding: hp(1), // Added padding for better spacing
        }}
        onPress={() => navigation.navigate('RecipeDetail', { ...item })}
      >
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <CachedImage
            uri={item.strMealThumb}
            style={{ width: '40%', aspectRatio: 1, borderRadius: hp(3) }} // Updated border radius to 10
            className="bg-black/5"
          />
          <View style={{ flex: 1, padding: hp(2), justifyContent: 'center' }}>
            <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }} numberOfLines={2}>
              {item.strMeal}
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}