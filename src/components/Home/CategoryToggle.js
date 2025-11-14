// CategoryToggle.jsx
import { Pressable, Text, View } from "react-native";

const CategoryToggle = ({ activeCategory, onChange }) => {
  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "men's clothing", label: "Men’s Clothing" },
    { id: "jewelery", label: "Jewelery" },
  ];

  return (
    <View className="flex flex-row justify-center items-center">
      {categories.map((cat) => {
        const isSelected = cat.id === activeCategory;

        return (
          <Pressable
            key={cat.id}
            onPress={() => onChange(cat.id)}
            className={`h-10 px-5 rounded-lg flex items-center justify-center ${
              isSelected ? "bg-orange-500" : "bg-gray-200"
            }`}
          >
            <Text
              className={`text-lg font-semibold ${
                isSelected ? "text-white" : "text-gray-600"
              }`}
            >
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default CategoryToggle;
