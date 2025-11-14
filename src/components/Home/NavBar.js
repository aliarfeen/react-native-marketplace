import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Navbar = () => {
    
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row items-center justify-between px-4 py-4">

      <Pressable className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
        <Ionicons name="menu" size={26} color="#000" />
      </Pressable>

      <Pressable onPress={ () => navigation.navigate("Cart")} className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
        <Ionicons name="cart-outline" size={26} color="#000" />
      </Pressable>

    </View>
  );
};

export default Navbar;
