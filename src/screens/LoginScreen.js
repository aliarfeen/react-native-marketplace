import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import storage from '../utils/storage';
import Toast from 'react-native-toast-message';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Information',
        text2: 'Please enter username and password',
        visibilityTime: 2000,
      });
      return;
    }

    setLoading(true);

    try {
      // استدعاء API للـ login
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        // حفظ الـ token
        await storage.saveToken(data.token);
        
        // حفظ بيانات المستخدم
        const userData = {
          username: username,
          token: data.token,
          loginTime: new Date().toISOString(),
        };
        await storage.saveUser(userData);

        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome back, ${username}!`,
          visibilityTime: 2000,
        });

        // الانتقال للصفحة الرئيسية
        navigation.replace('MainTabs');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Invalid credentials',
          visibilityTime: 2000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong. Please try again.',
        visibilityTime: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center px-8">
        {/* Logo/Title */}
        <View className="items-center mb-12">
          <Text className="text-4xl font-bold text-orange-500">
            MarketPlace
          </Text>
          <Text className="text-gray-500 mt-2">
            Welcome back! Please login
          </Text>
        </View>

        {/* Username Input */}
        <View className="mb-4">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Username
          </Text>
          <TextInput
            className="w-full px-4 py-3 bg-gray-100 rounded-xl"
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-2">
            Password
          </Text>
          <TextInput
            className="w-full px-4 py-3 bg-gray-100 rounded-xl"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="w-full py-4 bg-orange-500 rounded-xl items-center justify-center"
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-base">
              Login
            </Text>
          )}
        </TouchableOpacity>

        {/* Helper Text */}
        <View className="mt-8 bg-blue-50 p-4 rounded-xl">
          <Text className="text-xs text-gray-600 text-center">
            Test Credentials:{'\n'}
            Username: mor_2314{'\n'}
            Password: 83r5^_
          </Text>
        </View>
      </View>

      <Toast />
    </SafeAreaView>
  );
};

export default LoginScreen;