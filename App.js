import { Provider } from 'react-redux';
import "./global.css";
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/redux/store';
import Toast from "react-native-toast-message";
import { CustomToast } from "./src/components/CustomToast";

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
        <Toast config={CustomToast} />
    </Provider>
  );
}
