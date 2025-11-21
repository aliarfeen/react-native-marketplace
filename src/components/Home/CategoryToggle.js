// CategoryToggle.jsx
import { Pressable, StyleSheet, Text, View } from "react-native";

const CategoryToggle = ({ activeCategory, onChange }) => {
  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "men's clothing", label: "Men’s Clothing" },
    { id: "jewelery", label: "Jewelery" },
  ];

  return (
    <View style={styles.container}>
      {categories.map((cat) => {
        const isSelected = cat.id === activeCategory;

        return (
          <Pressable
            key={cat.id}
            onPress={() => onChange(cat.id)}
            style={[
              styles.toggleBase,
              isSelected ? styles.toggleSelected : styles.toggleUnselected,
            ]}
          >
            <Text
              style={[
                styles.toggleText,
                isSelected ? styles.toggleTextSelected : styles.toggleTextUnselected,
              ]}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleBase: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleSelected: {
    backgroundColor: "#F97316", // bg-orange-500
  },
  toggleUnselected: {
    backgroundColor: "#E5E7EB", // bg-gray-200
  },
  toggleText: {
    fontSize: 18,
    fontWeight: "600",
  },
  toggleTextSelected: {
    color: "#FFFFFF",
  },
  toggleTextUnselected: {
    color: "#4B5563", // text-gray-600
  },
});

export default CategoryToggle;
