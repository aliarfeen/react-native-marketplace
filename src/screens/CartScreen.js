import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import styles from "../styles/screens/cartStyles";

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();

  // 🔥 GET CART ITEMS FROM REDUX
  const cartItems = useSelector((state) => state.cart.items);

  // 🔥 CALCULATE TOTAL
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.imageBox]}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.title}</Text>
        </View>

        <Text style={styles.price}>${item.price}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() => dispatch(decreaseQuantity(item.id))}
              style={styles.qtyButton}
            >
              <Text style={styles.qtySymbol}>–</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{item.quantity}</Text>

            <TouchableOpacity
              onPress={() => dispatch(increaseQuantity(item.id))}
              style={styles.qtyButton}
            >
              <Text style={styles.qtySymbol}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
            <Icon name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={28} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Cart</Text>

        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
      />

      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.buyBtn}
          onPress={() =>
            Toast.show({
              type: "success",
              text1: "Order Placed",
              text2: "Thank you for your purchase!",
            })
          }
        >
          <Text style={styles.buyText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
