import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleNavigateToDetails = () => {
    navigation.navigate('ProductDetails', { productId: product.id });
  };

  return (
    <View className="bg-white rounded-2xl p-3 mr-4 w-40 shadow-sm">
      <TouchableOpacity onPress={handleNavigateToDetails}>
        <Image 
          source={{ uri: product.image }} 
          className="w-full h-32 rounded-xl mb-2"
          resizeMode="contain"
        />
      </TouchableOpacity>
      
      <Text className="text-sm font-semibold text-gray-800 mb-1" numberOfLines={2}>
        {product.title}
      </Text>
      
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-lg font-bold text-orange-500">
          ${product.price}
        </Text>
        
        <TouchableOpacity 
          onPress={handleAddToCart}
          className="bg-orange-500 rounded-full p-2"
        >
          <Ionicons name="add" size={18} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;