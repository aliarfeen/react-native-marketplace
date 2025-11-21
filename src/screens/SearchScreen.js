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
import { SafeAreaView } from "react-native-safe-area-context";
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
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
      }}
      onPress={() =>
        navigation.navigate("ProductDetails", { productId: item.id })
      }
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 64,
          height: 64,
          marginRight: 12,
          borderRadius: 8,
        }}
        resizeMode="contain"
      />

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            color: "#1F2937",
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <Text
          style={{
            fontSize: 13,
            color: "#6B7280",
            textTransform: "capitalize",
          }}
        >
          {item.category}
        </Text>

        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#F97316",
          }}
        >
          ${item.price.toFixed(2)}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View
      style={{
        flex: 1,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="search" size={60} color="#D1D5DB" />

      <Text
        style={{
          fontSize: 18,
          fontWeight: "500",
          color: "#6B7280",
          marginTop: 12,
        }}
      >
        {searchQuery ? "No products found" : "Search for products"}
      </Text>

      <Text
        style={{
          marginTop: 8,
          paddingHorizontal: 40,
          textAlign: "center",
          color: "#9CA3AF",
        }}
      >
        {searchQuery
          ? "Try different keywords or check for typos"
          : "Find products by name, category, or description"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* Search Bar */}
      <View style={{ padding: 16, backgroundColor: "#FFFFFF" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F3F4F6",
            borderRadius: 8,
            paddingHorizontal: 12,
            paddingVertical: 8,
          }}
        >
          <Ionicons name="search" size={20} color="#6B7280" />

          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 16,
              color: "#374151",
            }}
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

      {/* Product List */}
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
    </SafeAreaView>
  );
};

export default SearchScreen;
