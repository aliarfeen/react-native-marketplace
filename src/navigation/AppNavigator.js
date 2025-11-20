import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import storage from "../utils/storage";
import MainStack from "./Stack";

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
      console.error("Error checking login:", error);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#F16A26" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}
