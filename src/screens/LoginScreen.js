import { Ionicons } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fakeStoreApi } from "../api/fakeStoreApi";
import { setCredentials } from "../redux/slices/authSlice";
import { storage } from "../utils/storage";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  let [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace("Home");
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    const savedUser = await storage.getUser();
    const savedToken = await storage.getToken();

    if (savedUser && savedToken) {
      dispatch(
        setCredentials({
          user: savedUser,
          token: savedToken,
          sub: savedUser.id,
        })
      );
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
  const response = await fakeStoreApi.login(username, password);
  console.log("Login response:", response);

  if (response.token) {
    const decodedToken = jwtDecode(response.token);
    const userId = decodedToken.sub;   

    console.log("Decoded Token:", decodedToken);
    console.log("User ID:", userId);

    const userData = await fakeStoreApi.getUserById(userId);
    console.log("Fetched user data:", userData);

    await storage.saveUser(userData);
    await storage.saveToken(response.token);

    dispatch(
      setCredentials({
        user: userData,
        sub: userId,
        token: response.token,
      })
    );

    navigation.replace("MainTabs");
  }
} catch (error) {
  Alert.alert("Login Failed", "Invalid username or password");
}

  };

  return (
    <View className="flex-1 bg-white px-6 justify-center">
      <View className="mb-8">
        <Text className="text-4xl font-bold text-gray-800 mb-2 text-center">Welcome!</Text>
        <Text className="text-gray-500 text-base text-center">Sign in to continue</Text>
      </View>

      <View className="mb-4">
        <Text className="text-gray-700 mb-2 font-medium">Username</Text>
        <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center ">
          <Ionicons name="person-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base "
             style={{ borderWidth: 0, outlineWidth: 0 }}
            placeholder="Enter username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
      </View>

      <View className="mb-6">
        <Text className="text-gray-700 mb-2 font-medium">Password</Text>
        <View className="bg-gray-100 rounded-xl px-4 py-3 flex-row items-center">
          <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base"
             style={{ borderWidth: 0, outlineWidth: 0 }}
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        className="bg-orange-500 rounded-xl py-4 items-center shadow-sm"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-base">Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
