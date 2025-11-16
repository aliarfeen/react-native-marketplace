import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { removeFromWishlist, clearWishlist } from '../redux/slices/wishlistSlice';
import Toast from 'react-native-toast-message';

const WishListScreen = ({ navigation }) => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(removeFromWishlist(id));
    Toast.show({
      type: 'success',
      text1: 'Removed from Wishlist',
      text2: 'Item has been removed from your wishlist',
      visibilityTime: 2000,
    });
  };

  const handleClearAll = () => {
    dispatch(clearWishlist());
    Toast.show({
      type: 'info',
      text1: 'Wishlist Cleared',
      text2: 'All items have been removed',
      visibilityTime: 2000,
    });
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 mb-4 mx-4 shadow-sm flex-row">
      <View className="w-24 h-24 bg-gray-100 rounded-xl items-center justify-center mr-4">
        <Image
          source={{ uri: item.image }}
          className="w-20 h-20"
          resizeMode="contain"
        />
      </View>

      <View className="flex-1 justify-between">
        <View>
          <Text className="text-base font-bold text-gray-800" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="text-xs text-gray-500 mt-1" numberOfLines={1}>
            {item.category}
          </Text>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-lg font-bold text-orange-500">
            ${item.price}
          </Text>

          <TouchableOpacity
            onPress={() => handleRemove(item.id)}
            className="bg-red-50 rounded-full p-2"
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Empty State
  const EmptyWishlist = () => (
    <View className="flex-1 justify-center items-center px-8">
      <Ionicons name="heart-outline" size={80} color="#D1D5DB" />
      <Text className="text-xl font-bold text-gray-800 mt-6">
        Your Wishlist is Empty
      </Text>
      <Text className="text-sm text-gray-500 mt-2 text-center">
        Start adding items you love to your wishlist
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="mt-6 bg-orange-500 px-8 py-3 rounded-full"
      >
        <Text className="text-white font-semibold">Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="px-6 py-4 bg-white flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-800">My Wishlist</Text>
          <Text className="text-sm text-gray-500 mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {wishlistItems.length > 0 && (
          <TouchableOpacity
            onPress={handleClearAll}
            className="bg-red-50 px-4 py-2 rounded-lg"
          >
            <Text className="text-red-500 font-semibold text-sm">Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      {wishlistItems.length === 0 ? (
        <EmptyWishlist />
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 20,
          }}
          style={{ flex: 1 }}
        />
      )}

      <Toast />
    </SafeAreaView>
  );
};

export default WishListScreen;