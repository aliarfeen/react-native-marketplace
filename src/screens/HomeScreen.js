import { SafeAreaView, ScrollView, ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, setLoading } from '../redux/slices/productSlice';
import { logout } from '../redux/slices/authSlice';
import { fakeStoreApi } from '../api/fakeStoreApi';
import { storage } from '../utils/storage';
import Header from '../components/Header';
import CategoryList from '../components/CategoryList';
import { Ionicons } from '@expo/vector-icons';
import Swiper from 'react-native-swiper';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const loading = useSelector((state) => state.products.loading);

  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const data = await fakeStoreApi.getProducts();
      dispatch(setProducts(data));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = async () => {
    await storage.clearAll();
    dispatch(logout());
    navigation.replace('Login');
  };

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center">
        <ActivityIndicator size="large" color="#6C63FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* 🔥 Filter */}
        <View className="flex-row justify-around mt-3">
          {[
            { key: 'all', label: 'All' },
            { key: 'electronics', label: 'Electronics' },
            { key: 'jewelery', label: 'Jewelery' },
            { key: "men's clothing", label: "Men's Clothing" },
          ].map((c) => (
            <TouchableOpacity key={c.key} onPress={() => setSelectedCategory(c.key)}>
              <Text
                className={`font-semibold text-base ${
                  selectedCategory === c.key ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {c.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 🌟 Swiper Slider مع أسهم */}
        <View className="h-52 mt-5 relative">

          <Swiper
            autoplay
            autoplayTimeout={3.5}
            showsPagination={true}
            dotColor="#d1d5db"
            activeDotColor="#6366f1"
            loop={true}
          >

            <View className="flex-1 justify-center items-center bg-indigo-100 rounded-xl mx-4">
              <Ionicons name="pricetag-outline" size={50} color="#4f46e5" />
              <Text className="text-xl font-bold text-indigo-700 mt-2">Best Deals</Text>
            </View>

            <View className="flex-1 justify-center items-center bg-blue-100 rounded-xl mx-4">
              <Ionicons name="headset-outline" size={50} color="#2563eb" />
              <Text className="text-xl font-bold text-blue-700 mt-2">Electronics</Text>
            </View>

            <View className="flex-1 justify-center items-center bg-green-100 rounded-xl mx-4">
              <Ionicons name="shirt-outline" size={50} color="#059669" />
              <Text className="text-xl font-bold text-green-700 mt-2">Men's Fashion</Text>
            </View>

          </Swiper>

          {/* ◀️ السهم الشمال */}
          <TouchableOpacity
            className="absolute left-2 top-1/2 -mt-4 bg-white/80 p-2 rounded-full shadow"
            onPress={() => swiperRef?.scrollBy(-1)}
          >
            <Ionicons name="chevron-back" size={22} color="#374151" />
          </TouchableOpacity>

          {/* ▶️ السهم اليمين */}
          <TouchableOpacity
            className="absolute right-2 top-1/2 -mt-4 bg-white/80 p-2 rounded-full shadow"
            onPress={() => swiperRef?.scrollBy(1)}
          >
            <Ionicons name="chevron-forward" size={22} color="#374151" />
          </TouchableOpacity>

        </View>

        {/* 🔥 Products */}
        <View className="py-4">
          <CategoryList
            title={
              selectedCategory === 'all'
                ? 'All Products'
                : selectedCategory[0].toUpperCase() + selectedCategory.slice(1)
            }
            products={filteredProducts}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="mx-4 mb-8 bg-red-500 rounded-xl py-4 flex-row justify-center items-center"
        >
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white font-bold ml-2">Logout</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
