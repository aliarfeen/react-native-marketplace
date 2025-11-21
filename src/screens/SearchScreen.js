import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { fakeStoreApi } from "../api/fakeStoreApi";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fakeStoreApi.getProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filtered);
  }, [searchQuery, allProducts]);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      className="flex-row items-center p-3 border-b border-gray-100"
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: item.id })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-16 h-16 mr-3 rounded-md"
        resizeMode="contain"
      />
      <View className="flex-1">
        <Text className="font-medium text-gray-800" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-sm text-gray-500 capitalize">
          {item.category}
        </Text>
        <Text className="font-bold text-orange-500">
          ${item.price.toFixed(2)}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center mt-20">
      <Ionicons name="search" size={60} color="#D1D5DB" />
      <Text className="text-lg font-medium text-gray-500 mt-4">
        {searchQuery ? "No products found" : "Search for products"}
      </Text>
      <Text className="text-gray-400 text-center mt-2 px-10">
        {searchQuery
          ? "Try different keywords or check for typos"
          : "Find products by name, category, or description"}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      {/* Search Bar */}
      <View className="p-4 bg-white">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-700"
            placeholder="Search for products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Search Results */}
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#F16A26" />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmptyState}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

export default SearchScreen;
