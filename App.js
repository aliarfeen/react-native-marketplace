import { Provider } from 'react-redux';
import "./global.css";
import store from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
      {/* <AppNavigator /> */}
    </Provider>
  );
}
