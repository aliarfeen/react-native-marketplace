import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { Provider, useDispatch } from "react-redux";
import "./global.css";
import { CustomToast } from "./src/components/CustomToast";
import AppNavigator from "./src/navigation/AppNavigator";
import { loadWishlistFromStorage } from "./src/redux/slices/wishlistSlice";
import store from "./src/redux/store";

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // تحميل الـ wishlist من التخزين المحلي عند بدء التطبيق
    dispatch(loadWishlistFromStorage());
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AppNavigator />
        <Toast config={CustomToast} />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
