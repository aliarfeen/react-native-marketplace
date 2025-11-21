import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
} from "react-native";
import styles from "../styles/screens/cartStyles";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Apple W-series 6",
      price: 45000,
      size: "35",
      image: "https://via.placeholder.com/80",
      qty: 1,
      bgColor: "#E0F2F1",
    },
    {
      id: "2",
      name: "Siberia 800",
      price: 45000,
      size: "M",
      image: "https://via.placeholder.com/80",
      qty: 1,
      bgColor: "#FCE4EC",
    },
  ]);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );

    Toast.show({
      type: "success",
      text1: "Quantity Updated",
      text2: "Item quantity increased",
    });
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (item.qty === 1) {
      Toast.show({
        type: "error",
        text1: "Minimum Quantity",
        text2: "You can't go lower than 1",
      });
      return;
    }

    setCartItems(
      cartItems.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
    );

    Toast.show({
      type: "info",
      text1: "Quantity Updated",
      text2: "Item quantity decreased",
    });
  };
  const deleteItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));

    Toast.show({
      type: "error",
      text1: "Item Removed",
      text2: "Product deleted from cart",
    });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.imageBox, { backgroundColor: item.bgColor }]}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.size}>Size: {item.size}</Text>
        </View>

        <Text style={styles.price}>₦ {item.price.toLocaleString()}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() => decreaseQty(item.id)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtySymbol}>–</Text>
            </TouchableOpacity>

            <Text style={styles.qtyNumber}>{item.qty}</Text>

            <TouchableOpacity
              onPress={() => increaseQty(item.id)}
              style={styles.qtyButton}
            >
              <Text style={styles.qtySymbol}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => deleteItem(item.id)}>
            <Icon name="trash-outline" size={22} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

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
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
      />

      <View style={styles.totalContainer}>
        <View style={styles.totalBox}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalAmount}>₦ {total.toLocaleString()}</Text>
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
