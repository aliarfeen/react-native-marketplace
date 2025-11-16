import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { fakeStoreApi } from "../api/fakeStoreApi";

export default function ProfileScreen({ route, navigation }) {
  const userId = route.params?.userId || 1;

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const userData = await fakeStoreApi.getUserById(userId);
      setUser(userData);
    } catch (err) {
      setError("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const firstLetter = user?.name?.firstname
    ? user.name.firstname.charAt(0).toUpperCase()
    : "?";

  const handleLogout = () => {
    Toast.show({
      type: "success",
      text1: "Logged out successfully",
      position: "bottom",
      visibilityTime: 1500,
    });
    setTimeout(() => navigation.replace("Login"), 1600);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#F16A26" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{firstLetter}</Text>
          </View>

          <Text style={styles.username}>
            {user.name?.firstname || ""} {user.name?.lastname || ""}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() =>
              navigation.navigate("EditProfile", {
                user,
                onUpdate: (updatedUser) => setUser(updatedUser),
              })
            }
          >
            <Ionicons name="pencil-outline" size={14} color="#fff" />
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Personal Information</Text>

          <View style={styles.row}>
            <Ionicons
              name="call-outline"
              size={18}
              color="#888"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.value}>{user.phone}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="mail-outline"
              size={18}
              color="#888"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.value}>{user.email}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="location-outline"
              size={18}
              color="#888"
              style={{ marginRight: 8 }}
            />
            <Text style={styles.value}>
              {user.address?.number || ""} {user.address?.street || ""},{" "}
              {user.address?.city || ""} - {user.address?.zipcode || ""}
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={14}
            color="#FF3B30"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F7" },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 4,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  avatarText: { fontSize: 40, fontWeight: "700", color: "#555" },
  username: { fontSize: 22, fontWeight: "700", color: "#333" },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#F16A26",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    elevation: 3,
  },
  editText: { color: "#fff", fontSize: 12, fontWeight: "700", marginLeft: 4 },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: "700", marginBottom: 15, color: "#333" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  value: { fontSize: 15, fontWeight: "600", color: "#222" },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#FF3B30",
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 20,
    marginHorizontal: 120,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { color: "#FF3B30", fontSize: 12, fontWeight: "600" },
});
