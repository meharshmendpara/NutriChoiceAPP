// TabBar.js
import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBarStyle}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconName;
        if (route.name === 'Home') {
          iconName = 'home-outline';
        } else if (route.name === 'Explore') {
          iconName = 'chevron-up-circle-outline';
        } else if (route.name === 'Notification') {
          iconName = 'notifications-outline';
        }

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? '#fbbf24' : 'transparent' }, // Update here
            ]}
            onPress={onPress}
          >
            <Icon name={iconName} size={25} color={isFocused ? '#fff' : '#000'} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    height: 50,
    elevation: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 15,
  },
});
