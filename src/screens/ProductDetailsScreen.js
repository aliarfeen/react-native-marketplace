import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fakeStoreApi } from "../api/fakeStoreApi";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await fakeStoreApi.getProduct(productId);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Ionicons key={i} name="star" size={20} color="#F59E0B" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <Ionicons key={i} name="star-half" size={20} color="#F59E0B" />
        );
      } else {
        stars.push(
          <Ionicons key={i} name="star-outline" size={20} color="#D1D5DB" />
        );
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#F16A26" />
      </View>
    );
  }

  if (!product) {
    return (
      <View className="flex-1 justify-center items-center bg-white p-4">
        <Text className="text-lg text-gray-700">Product not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header with back button */}
        <View className="relative">
          <Image
            source={{ uri: product.image }}
            className="w-full h-80"
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-12 left-5 bg-white p-2 rounded-full shadow"
          >
            <Ionicons name="arrow-back" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View className="p-5">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            {product.title}
          </Text>

          <View className="flex-row items-center mb-3">
            <View className="flex-row mr-2">
              {renderRatingStars(product.rating?.rate || 0)}
            </View>
            <Text className="text-gray-600">
              {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
            </Text>
          </View>

          <View className="bg-blue-50 rounded-lg p-3 mb-4">
            <Text className="text-2xl font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </Text>
            <Text className="text-green-600 text-sm mt-1">In Stock</Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              {product.description}
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              Category
            </Text>
            <Text className="text-blue-600 capitalize">{product.category}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View className="p-5 border-t border-gray-200">
        <TouchableOpacity
          className="bg-[#F16A26] py-4 rounded-lg items-center"
          onPress={() => {
            // Add to cart functionality
            alert("Added to cart!");
          }}
        >
          <Text className="text-white font-bold text-lg">Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailsScreen;
