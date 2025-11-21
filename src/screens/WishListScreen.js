import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { clearWishlist, removeFromWishlist } from '../redux/slices/wishlistSlice';

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
    <View style={styles.card}>
      <View style={styles.cardImageWrapper}>
        <Image
          source={{ uri: item.image }}
          style={styles.cardImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.cardContent}>
        <View>
          <Text style={styles.cardTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.cardCategory} numberOfLines={1}>
            {item.category}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.cardPrice}>
            ${item.price}
          </Text>

          <TouchableOpacity
            onPress={() => handleRemove(item.id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // Empty State
  const EmptyWishlist = () => (
    <View style={styles.emptyWrapper}>
      <Ionicons name="heart-outline" size={80} color="#D1D5DB" />
      <Text style={styles.emptyTitle}>
        Your Wishlist is Empty
      </Text>
      <Text style={styles.emptySubtitle}>
        Start adding items you love to your wishlist
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={styles.emptyButton}
      >
        <Text style={styles.emptyButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Wishlist</Text>
          <Text style={styles.headerSubtitle}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        {wishlistItems.length > 0 && (
          <TouchableOpacity
            onPress={handleClearAll}
            style={styles.clearAllButton}
          >
            <Text style={styles.clearAllButtonText}>Clear All</Text>
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
          contentContainerStyle={styles.listContent}
          style={styles.list}
        />
      )}

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB', // bg-gray-50
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937', // text-gray-800
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280', // text-gray-500
    marginTop: 4,
  },
  clearAllButton: {
    backgroundColor: '#FEF2F2', // bg-red-50
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearAllButtonText: {
    color: '#EF4444',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardImageWrapper: {
    width: 96,
    height: 96,
    backgroundColor: '#F3F4F6', // bg-gray-100
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  cardImage: {
    width: 80,
    height: 80,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937', // text-gray-800
  },
  cardCategory: {
    fontSize: 12,
    color: '#6B7280', // text-gray-500
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F97316', // text-orange-500
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
    borderRadius: 9999,
    padding: 8,
  },
  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 24,
    backgroundColor: '#F97316',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 9999,
  },
  emptyButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  list: {
    flex: 1,
  },
});

export default WishListScreen;