import { Image, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = (product) => {
  return (
    
    <TouchableOpacity
      className="w-[204px] h-[204px] overflow-scroll bg-[#F8F8F8] rounded-xl p-3 items-center justify-between"
      activeOpacity={0.8}
    >
      {/* Product Image */}
      <Image
        source={{ uri: product.product.image }} 
        className="w-28 h-28 mt-2"
        resizeMode="contain"
      />

      {/* Product Info */}
      <View className="w-full mt-2">
        <Text className="text-sm text-center text-gray-800 line-clamp-1">{product.product.title}</Text>
        <View className="flex-row justify-start mt-1">
          <Text className="text-base font-bold text-gray-900">${product.product.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
