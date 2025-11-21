import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import WishListScreen from "../screens/WishListScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            return (
              <Icon
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === "Search") {
            return (
              <Icon
                name={focused ? "search" : "search-outline"}
                size={size}
                color={color}
              />
            );
          }
          if (route.name === "Wishlist") {
            return (
              <View style={{ position: "relative" }}>
                <Icon
                  name={focused ? "heart" : "heart-outline"}
                  size={size}
                  color={color}
                />
                {wishlistCount > 0 && (
                  <View
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -10,
                      backgroundColor: "#EF4444",
                      minWidth: 18,
                      height: 18,
                      borderRadius: 9,
                      justifyContent: "center",
                      alignItems: "center",
                      paddingHorizontal: 4,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </Text>
                  </View>
                )}
              </View>
            );
          }
          if (route.name === "Profile") {
            return (
              <MaterialIcons
                name={focused ? "account-circle" : "account-circle-outline"}
                size={28}
                color={color}
              />
            );
          }
        },

        tabBarActiveTintColor: "#F16A26",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: "#fff",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={WishListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
