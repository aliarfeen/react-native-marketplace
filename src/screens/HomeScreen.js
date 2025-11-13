import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Home Screen</Text>
        <Text style={styles.subtitle}>This is a simple text-only React Native screen.</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#6d3535ff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
  },
});
