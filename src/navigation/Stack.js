import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "../screens/CartScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import Tabs from "./Tabs";
const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: { backgroundColor: "#F16A26" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="MainTabs" component={Tabs} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
