import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Navbar = () => {
    
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable style={styles.logoWrapper}>
        <Text style={styles.logoText}>MarketPlace</Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Cart")}
        style={styles.iconButton}
      >
        <Ionicons name="cart-outline" size={26} color="#000" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  logoWrapper: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#F16A26",
  },
  iconButton: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: "#F3F4F6", // bg-gray-100
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Navbar;
