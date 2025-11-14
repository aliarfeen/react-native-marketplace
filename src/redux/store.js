import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import homeReducer from './slices/homeSlice';

const store = configureStore({
  reducer: {
    home: homeReducer,
    auth: authReducer,
    // products: productReducer,
    // cart: cartReducer,
  },
});

export default store;
