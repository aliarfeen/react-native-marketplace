import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fakeStoreApi } from "../api/fakeStoreApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductDetailsScreen = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const navigation = useNavigation();
  const { productId } = route.params;
  const dispatch = useDispatch();

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F16A26" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <ScrollView style={styles.scroll}>
        {/* Header with back button */}
        <View style={styles.headerWrapper}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Product Info */}
        <View style={styles.contentWrapper}>
          <Text style={styles.titleText}>{product.title}</Text>

          <View style={styles.ratingRow}>
            <View style={styles.ratingStarsRow}>
              {renderRatingStars(product.rating?.rate || 0)}
            </View>
            <Text style={styles.ratingText}>
              {product.rating?.rate || 0} ({product.rating?.count || 0} reviews)
            </Text>
          </View>

          <View style={styles.priceBox}>
            <Text style={styles.priceText}>${product.price.toFixed(2)}</Text>
            <Text style={styles.inStockText}>In Stock</Text>
          </View>

          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.sectionBody}>{product.description}</Text>
          </View>

          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Category</Text>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.footerWrapper}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={() => {
            dispatch(addToCart(product)); // <-- dispatch here
            alert("Added to cart!");
          }}
        >
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
  },
  notFoundText: {
    fontSize: 18,
    color: "#374151", // text-gray-700
  },
  headerWrapper: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 320, // h-80 approx
  },
  backButton: {
    position: "absolute",
    top: 48, // top-12
    left: 20, // left-5
    backgroundColor: "#FFFFFF",
    padding: 8, // p-2
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  contentWrapper: {
    padding: 20, // p-5
  },
  titleText: {
    fontSize: 24, // text-2xl
    fontWeight: "bold",
    color: "#111827", // text-gray-900
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  ratingStarsRow: {
    flexDirection: "row",
    marginRight: 8,
  },
  ratingText: {
    color: "#4B5563", // text-gray-600
  },
  priceBox: {
    backgroundColor: "#EFF6FF", // bg-blue-50
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  priceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563EB", // text-blue-600
  },
  inStockText: {
    color: "#16A34A", // text-green-600
    fontSize: 14,
    marginTop: 4,
  },
  sectionWrapper: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937", // text-gray-800
    marginBottom: 8,
  },
  sectionBody: {
    color: "#4B5563", // text-gray-600
    lineHeight: 24,
  },
  categoryText: {
    color: "#2563EB", // text-blue-600
    textTransform: "capitalize",
  },
  footerWrapper: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB", // border-gray-200
  },
  addToCartButton: {
    backgroundColor: "#F16A26",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  addToCartText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ProductDetailsScreen;
