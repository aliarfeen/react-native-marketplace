import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, Text, View } from "react-native";

import Toast from 'react-native-toast-message';
import CategoryToggle from "../components/Home/CategoryToggle";
import Navbar from "../components/Home/NavBar";
import ProductCard from "../components/Home/ProductCard";
import storage from "../utils/storage";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("electronics");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  //prevents back button to get back to previous screen
 useFocusEffect(
  useCallback(() => {
    const onBackPress = () => {
      BackHandler.exitApp();
      return true; // prevent default
    };

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );

    return () => {
      subscription.remove(); 
    };
  }, [])
);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await storage.getUser();
      console.log(user);
      setUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${activeCategory}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [activeCategory]); 

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Navbar />  
        
        <Text style={styles.greetingText}>
          Hello {user?.username}!
        </Text>
        <Text style={styles.subtitleText}>
          Let's start shopping!
        </Text>

        <CategoryToggle
          activeCategory={activeCategory}
          onChange={(cat) => setActiveCategory(cat)}
        />

        <View style={styles.productsGrid}>
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
      
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937", // text-gray-800
    marginTop: 16,
  },
  subtitleText: {
    fontSize: 16,
    color: "#4B5563", // text-gray-600
    marginBottom: 16,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    
    justifyContent: "space-between",
    marginTop: 16,
    width: "100%",
  },
});

export default HomeScreen;