import { useState } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import storage from '../utils/storage';

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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Logo/Title */}
        <View style={styles.logoWrapper}>
          <Text style={styles.logoTitle}>
            MarketPlace
          </Text>
          <Text style={styles.logoSubtitle}>
            Welcome back! Please login
          </Text>
        </View>

        {/* Username Input */}
        <View style={styles.fieldWrapper}>
          <Text style={styles.fieldLabel}>
            Username
          </Text>
          <TextInput
            style={[styles.input, { borderWidth: 0, outlineWidth: 0 }]}
            placeholder="Enter your username"

            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        {/* Password Input */}
        <View style={styles.fieldWrapperLarge}>
          <Text style={styles.fieldLabel}>
            Password
          </Text>
          <TextInput
            style={[styles.input, { borderWidth: 0, outlineWidth: 0 }]}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            editable={!loading}
          />
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}

          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>
              Login
            </Text>
          )}
        </TouchableOpacity>

      </View>

      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 48,
  },
  logoTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#F97316", // text-orange-500
  },
  logoSubtitle: {
    marginTop: 8,
    color: "#6B7280", // text-gray-500
  },
  fieldWrapper: {
    marginBottom: 16,
  },
  fieldWrapperLarge: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151", // text-gray-700
    marginBottom: 8,
  },
  input: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F3F4F6", // bg-gray-100
    borderRadius: 16,
  },
  loginButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: "#F97316", // bg-orange-500
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;