import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-web";
import Toast from 'react-native-toast-message';
import CategoryToggle from "../components/Home/CategoryToggle";
import Navbar from "../components/Home/NavBar";
import ProductCard from "../components/Home/ProductCard";
import storage from "../utils/storage";

const HomeScreen = () => {
  const [activeCategory, setActiveCategory] = useState("electronics");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

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
      <ScrollView className="p-5">
        <Navbar />  
        
        <Text className="text-xl font-bold text-gray-800 mt-4">
          Hello {user?.username}!
        </Text>
        <Text className="text-base text-gray-600 mb-4">
          Let's start shopping!
        </Text>

        <CategoryToggle
          activeCategory={activeCategory}
          onChange={(cat) => setActiveCategory(cat)}
        />

        <View className="grid grid-cols-2 gap-4 mt-4 w-full">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </View>
      </ScrollView>
      
      <Toast />
    </>
  );
};

export default HomeScreen;