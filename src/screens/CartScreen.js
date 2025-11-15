import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { CustomToast } from "../components/CustomToast"; 
import styles from "../styles/screens/cartStyles";

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Red Sneakers",
      size: "M",
      price: 50,
      qty: 1,
      image: "https://via.placeholder.com/100",
      bgColor: "#FDE2E2",
      productId: 21,
    },
    {
      id: "2",
      name: "Blue Hoodie",
      size: "L",
      price: 70,
      qty: 2,
      image: "https://via.placeholder.com/100",
      bgColor: "#E2F0FD",
      productId: 22,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  
  const showToast = (type, text1, text2) => {
    Toast.show({ type, text1, text2, visibilityTime: 2000 });
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
    );
    showToast("info", "Quantity Increased", "Item quantity has been increased");
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((i) => i.id === id);
    if (item.qty === 1) {
      showToast("info", "Minimum Quantity", "Cannot go below 1");
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
    );
    showToast("info", "Quantity Decreased", "Item quantity has been decreased");
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    showToast("error", "Item Removed", "Item has been removed from the cart");
  };

  const handleBuy = async () => {
    if (cartItems.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/carts", {

        //http://10.0.2.2:3000/carts for android 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.qty,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCartItems([]);
        showToast("success", "Order Placed", "Cart sent to API!");
      } else {
        showToast("error", "Error", "Failed to send cart");
      }
    } catch (error) {
      showToast("error", "Network Error", "Check your connection");
    } finally {
      setLoading(false);
    }
  };

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

        <Text style={styles.price}>${item.price}</Text>

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

          <TouchableOpacity onPress={() => removeItem(item.id)}>
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

      {cartItems.length === 0 ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Icon name="cart-outline" size={80} color="#ccc" />
          <Text style={{ marginTop: 15, fontSize: 20, color: "#555", fontWeight: "500" }}>
            Your cart is empty
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16, color: "#888" }}>
            Looks like you haven't added anything yet
          </Text>

          <TouchableOpacity
            style={{
              marginTop: 25,
              paddingHorizontal: 25,
              paddingVertical: 12,
              backgroundColor: "#F16A26",
              borderRadius: 10,
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}>
              Continue Shopping
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 20 }}
          />

          {/* Total Box */}
          <View style={styles.totalContainer}>
            <View style={styles.totalBox}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalAmount}>${total}</Text>
            </View>

            {loading ? (
              <View style={[styles.buyBtn, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity style={styles.buyBtn} onPress={handleBuy}>
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Custom Toast */}
      <Toast config={CustomToast} />
    </SafeAreaView>
  );
}
