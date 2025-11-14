import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Ionicons name="cart-outline" size={80} color="#d1d5db" />
        <Text className="text-gray-500 text-lg mt-4">Your cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="p-4">
          {cartItems.map((item) => (
            <View 
              key={item.id} 
              className="bg-white rounded-2xl p-4 mb-3 flex-row shadow-sm"
            >
              <Image 
                source={{ uri: item.image }} 
                className="w-24 h-24 rounded-xl"
                resizeMode="contain"
              />
              
              <View className="flex-1 ml-4 justify-between">
                <View>
                  <Text className="text-base font-semibold text-gray-800 mb-1" numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    Quantity: {item.quantity}
                  </Text>
                </View>
                
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold text-orange-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  
                  <TouchableOpacity 
                    onPress={() => handleRemove(item.id)}
                    className="bg-red-100 rounded-full p-2"
                  >
                    <Ionicons name="trash-outline" size={18} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="bg-white border-t border-gray-200 p-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-base">Subtotal</Text>
          <Text className="text-xl font-bold text-gray-800">
            ${total.toFixed(2)}
          </Text>
        </View>
        
        <TouchableOpacity 
          className="bg-orange-500 rounded-xl py-4 items-center shadow-sm"
        >
          <Text className="text-white font-bold text-base">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;