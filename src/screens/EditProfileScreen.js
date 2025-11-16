import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { fakeStoreApi } from "../api/fakeStoreApi";

export default function EditProfileScreen({ route, navigation }) {
  const user = route.params?.user || {};
  const onUpdate = route.params?.onUpdate;

  const [firstName, setFirstName] = useState(user.name?.firstname || "");
  const [lastName, setLastName] = useState(user.name?.lastname || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [street, setStreet] = useState(user.address?.street || "");
  const [city, setCity] = useState(user.address?.city || "");
  const [number, setNumber] = useState(user.address?.number?.toString() || "");
  const [zipcode, setZipcode] = useState(user.address?.zipcode || "");
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsModified(
      firstName !== user.name?.firstname ||
        lastName !== user.name?.lastname ||
        email !== user.email ||
        phone !== user.phone ||
        street !== user.address?.street ||
        city !== user.address?.city ||
        number !== (user.address?.number?.toString() || "") ||
        zipcode !== user.address?.zipcode
    );
  }, [firstName, lastName, email, phone, street, city, number, zipcode]);

  const firstLetter = firstName.charAt(0).toUpperCase();

  const showToast = (type, text1, text2) => {
    Toast.show({ type, text1, text2, visibilityTime: 2000 });
  };

  const handleSave = async () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !street ||
      !city ||
      !number ||
      !zipcode
    ) {
      showToast("error", "Error", "All fields are required");
      return;
    }

    if (!user.id) {
      showToast("error", "Error", "User ID is missing");
      return;
    }

    const updatedUser = {
      ...user,
      name: { firstname: firstName, lastname: lastName },
      email,
      phone,
      address: { street, city, number: Number(number), zipcode },
    };

    setLoading(true);
    try {
      await fakeStoreApi.updateUser(user.id, updatedUser);
      showToast("success", "Saved", "Profile updated successfully");
      setIsModified(false);
      onUpdate && onUpdate(updatedUser);
      navigation.goBack();
    } catch (error) {
      console.error("Update error:", error);
      showToast("error", "Error", "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>

      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
        <TouchableOpacity style={styles.editIcon}>
          <Ionicons name="camera-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {[
          { label: "First Name", value: firstName, setter: setFirstName },
          { label: "Last Name", value: lastName, setter: setLastName },
          { label: "Email", value: email, setter: setEmail },
          { label: "Phone", value: phone, setter: setPhone },
          { label: "Street", value: street, setter: setStreet },
          { label: "City", value: city, setter: setCity },
          { label: "Number", value: number, setter: setNumber },
          { label: "Zipcode", value: zipcode, setter: setZipcode },
        ].map((field, i) => (
          <React.Fragment key={i}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={styles.input}
              value={field.value}
              onChangeText={field.setter}
              placeholder={field.label}
              keyboardType={
                ["phone", "number", "zipcode"].includes(
                  field.label.toLowerCase()
                )
                  ? "numeric"
                  : "default"
              }
            />
          </React.Fragment>
        ))}
      </View>

      <TouchableOpacity
        disabled={!isModified || loading}
        onPress={handleSave}
        activeOpacity={0.8}
        style={{ marginHorizontal: 25, marginTop: 10, marginBottom: 30 }}
      >
        <LinearGradient
          colors={["#F16A26", "#FF8C47"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.saveBtn, { opacity: isModified ? 1 : 0.6 }]}
        >
          <Text style={styles.saveText}>{loading ? "Saving..." : "Save"}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F2F4F7" },
  header: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    elevation: 4,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerTitle: { fontSize: 24, fontWeight: "700", color: "#000" },
  backBtn: {
    position: "absolute",
    left: 20,
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F16A26",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    position: "relative",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  avatarText: { fontSize: 50, fontWeight: "700", color: "#555" },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#F16A26",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  form: { marginHorizontal: 25 },
  label: { fontSize: 14, color: "#555", marginBottom: 6, fontWeight: "600" },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 15,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  saveBtn: {
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
