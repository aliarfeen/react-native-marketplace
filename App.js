import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';

import Toast from "react-native-toast-message";
import { CustomToast } from "./src/components/CustomToast";
import AppNavigator from './src/navigation/AppNavigator';
import { loadWishlistFromStorage } from './src/redux/slices/wishlistSlice';
import store from './src/redux/store';
// استيراد الـ store و الـ Provider من react-redux
function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
// تحميل الـ wishlist من التخزين المحلي عند بدء التطبيق
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  return (
    <>
      <AppNavigator />
      <Toast config={CustomToast} />
    </>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}