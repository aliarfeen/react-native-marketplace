import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
// التحقق مما إذا كان المنتج في الـ wishlist  
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
      className="w-[204px] h-[204px] overflow-scroll bg-[#F8F8F8] rounded-xl p-3 items-center"
      activeOpacity={0.8}
    >
      <View className="relative w-full h-full items-center justify-between">
        
        <TouchableOpacity 
          className="absolute top-0 right-0 z-10 w-8 h-8 rounded-full bg-white items-center justify-center shadow-sm"
          onPress={toggleFavorite}
          activeOpacity={0.7}
        >
          <Ionicons 
            name={heartIcon} 
            size={20} 
            color={iconColor} 
          />
        </TouchableOpacity>

        <Image
          source={{ uri: product.image }}
          className="w-28 h-28 mt-2"
          resizeMode="contain"
        />

        <View className="w-full mt-2">
          <Text className="text-sm text-center text-gray-800 line-clamp-1">
            {product.title}
          </Text>
          
          <View className="flex-row items-center justify-between mt-1">
            <Text className="text-base font-bold text-gray-900">
              ${product.price}
            </Text>

            <TouchableOpacity 
              className="px-2 py-1 bg-orange-500 rounded-lg"
              onPress={addToCart}
              activeOpacity={0.7}
            >
              <Text className="text-xs font-semibold text-white">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;