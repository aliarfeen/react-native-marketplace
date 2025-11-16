import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WISHLIST_STORAGE_KEY = 'wishlist_items';

const initialState = {
  items: [],
};

// حفظ الـ wishlist في AsyncStorage
const saveWishlistToStorage = async (items) => {
  try {
    await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error saving wishlist:', error);
  }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
   //تحميل الـ wishlist من التخزين المحلي
    loadWishlist: (state, action) => {
      state.items = action.payload;
    },
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistToStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage([]);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, loadWishlist } = wishlistSlice.actions;

// دالة لتحميل الـ wishlist من AsyncStorage
export const loadWishlistFromStorage = () => async (dispatch) => {
  try {
    const savedWishlist = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
    if (savedWishlist) {
      dispatch(loadWishlist(JSON.parse(savedWishlist)));
    }
  } catch (error) {
    console.error('Error loading wishlist:', error);
  }
};

export default wishlistSlice.reducer;