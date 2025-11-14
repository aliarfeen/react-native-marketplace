import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const CustomToast = {
  success: ({ text1, text2 }) => (
    <View style={styles.toastBox}>
      <Icon name="checkmark-circle" size={26} color="#4CAF50" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),

  error: ({ text1, text2 }) => (
    <View style={styles.toastBox}>
      <Icon name="close-circle" size={26} color="#E53935" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),

  info: ({ text1, text2 }) => (
    <View style={styles.toastBox}>
      <Icon name="information-circle" size={26} color="#0277BD" />
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.title}>{text1}</Text>
        <Text style={styles.message}>{text2}</Text>
      </View>
    </View>
  ),
};

const styles = StyleSheet.create({
  toastBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    borderLeftWidth: 5,
    borderLeftColor: "#F16A26",
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#000",
  },
  message: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
});
