import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import ProductCard from '../components/ProductCard';
import { Ionicons } from '@expo/vector-icons';

const CategoryList = ({ title, products }) => {

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollTo({ x: 0, animated: true });
  };

  const scrollRight = () => {
    scrollRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View className="mb-6">

      {/* العنوان + السهمين */}
      <View className="flex-row justify-between items-center px-4 mb-3">
        <Text className="text-xl font-bold text-gray-800">
          {title}
        </Text>

        <View className="flex-row">
          <TouchableOpacity onPress={scrollLeft} className="mr-3">
            <Ionicons name="chevron-back-circle" size={32} color="#f97316" />
          </TouchableOpacity>

          <TouchableOpacity onPress={scrollRight}>
            <Ionicons name="chevron-forward-circle" size={32} color="#f97316" />
          </TouchableOpacity>
        </View>
      </View>

      {/* المنتجات */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryList;
