import { SafeAreaView, ScrollView, View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { fakeStoreApi } from '../api/fakeStoreApi';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const data = await fakeStoreApi.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigation.goBack();
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </SafeAreaView>
    );
  }

  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text className="text-gray-500">Product not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-gray-50 p-8">
          <Image 
            source={{ uri: product.image }} 
            className="w-full h-80"
            resizeMode="contain"
          />
        </View>

        <View className="p-6">
          <View className="flex-row items-center mb-2">
            <View className="bg-orange-100 px-3 py-1 rounded-full">
              <Text className="text-orange-600 text-xs font-semibold uppercase">
                {product.category}
              </Text>
            </View>
          </View>

          <Text className="text-2xl font-bold text-gray-800 mb-3">
            {product.title}
          </Text>

          <View className="flex-row items-center mb-4">
            <Ionicons name="star" size={18} color="#f59e0b" />
            <Text className="text-gray-700 ml-1 font-semibold">
              {product.rating?.rate}
            </Text>
            <Text className="text-gray-500 ml-1">
              ({product.rating?.count} reviews)
            </Text>
          </View>

          <Text className="text-3xl font-bold text-orange-500 mb-6">
            ${product.price}
          </Text>

          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View className="border-t border-gray-200 p-4 bg-white">
        <TouchableOpacity 
          onPress={handleAddToCart}
          className="bg-orange-500 rounded-xl py-4 flex-row justify-center items-center shadow-sm"
        >
          <Ionicons name="cart-outline" size={22} color="white" />
          <Text className="text-white font-bold text-base ml-2">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;