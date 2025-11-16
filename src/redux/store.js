import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';
import wishlistReducer from '../redux/slices/wishlistSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    // products: productReducer,
    // cart: cartReducer,
  },
});

export default store;
