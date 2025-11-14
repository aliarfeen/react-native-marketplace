import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <View className="bg-white px-4 py-3 flex-row justify-between items-center border-b border-gray-200">
      <View>
        <Text className="text-gray-500 text-sm">Hello,</Text>
        <Text className="text-lg font-bold text-gray-800">
          {user?.username || 'Guest'}
        </Text>
      </View>
      
      <TouchableOpacity 
        onPress={() => navigation.navigate('Cart')}
        className="relative"
      >
        <Ionicons name="cart-outline" size={28} color="#1f2937" />
        {cartCount > 0 && (
          <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-white text-xs font-bold">{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;