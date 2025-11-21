import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === product.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromWishlist(product.id));
      Toast.show({
        type: 'info',
        text1: 'Removed from Wishlist',
        text2: `${product.title} has been removed`,
        visibilityTime: 2000,
      });
    } else {
      dispatch(addToWishlist(product));
      Toast.show({
        type: 'success',
        text1: 'Added to Wishlist',
        text2: `${product.title} has been added`,
        visibilityTime: 2000,
      });
    }
  };

  const addToCart = () => {
    console.log(`Added to cart: ${product.title}`);
    Toast.show({
      type: 'success',
      text1: 'Added to Cart',
      text2: `${product.title} added successfully`,
      visibilityTime: 2000,
    });
  };

  const heartIcon = isFavorite ? "heart" : "heart-outline";
  const iconColor = isFavorite ? "#EF4444" : "gray";

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
    >
      <View style={styles.cardInner}>
        
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={heartIcon} 
            size={20} 
            color={iconColor} 
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
        >
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.infoWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {product.title}
          </Text>
          
          <View style={styles.footerRow}>
            <Text style={styles.price}>
              ${product.price}
            </Text>

            <TouchableOpacity 
              style={styles.addButton}
              onPress={addToCart}
              activeOpacity={0.7}
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "48%", // allow 2 cards per row in the grid
    height: 180,
    backgroundColor: "#F8F8F8",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  cardInner: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  favoriteButton: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    marginTop: 8,
  },
  infoWrapper: {
    width: "100%",
    marginTop: 8,
  },
  title: {
    fontSize: 12,
    textAlign: "center",
    color: "#1F2937", 
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827", 
  },
  addButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#F97316", // bg-orange-500
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});

export default ProductCard;