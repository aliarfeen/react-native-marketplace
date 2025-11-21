import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import homeReducer from "./slices/homeSlice";

const store = configureStore({
  reducer: {
    home: homeReducer,
    cart: cartReducer,
  },
});

export default store;
git;
