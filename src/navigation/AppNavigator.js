import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import { View, Text, ActivityIndicator } from "react-native";
import storage from "../utils/storage";

// Import screens
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import WishListScreen from "../screens/WishListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import CartScreen from './../screens/CartScreen';
import EditProfileScreen from './../screens/EditProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// -------------------
// Bottom Tabs
// -------------------
function Tabs() {
  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          switch (route.name) {
            case "Home":
              return (
                <Icon
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            case "Search":
              return (
                <Icon
                  name={focused ? "search" : "search-outline"}
                  size={size}
                  color={color}
                />
              );
            case "Wishlist":
              return (
                <View style={{ position: "relative" }}>
                  <Icon
                    name={focused ? "heart" : "heart-outline"}
                    size={size}
                    color={color}
                  />
                  {/* Badge للعد */}
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
                        {wishlistCount > 99 ? '99+' : wishlistCount}
                      </Text>
                    </View>
                  )}
                </View>
              );
            case "Profile":
              return (
                <MaterialIcons
                  name={focused ? "account-circle" : "account-circle-outline"}
                  size={28}
                  color={color}
                />
              );
            default:
              return null;
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

// -------------------
// Stack Navigator
// -------------------
export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await storage.getUser();
      setIsLoggedIn(!!user);
    } catch (error) {
      console.error('Error checking login:', error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#F16A26" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "MainTabs" : "Login"}
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "#ff9900ff" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="MainTabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}