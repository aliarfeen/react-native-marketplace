import { StyleSheet, StatusBar } from "react-native";

const cartStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "semi-bold",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 15,
    marginVertical: 10,
    alignItems: "center",
  },

  imageBox: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 55, height: 55, resizeMode: "contain" },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: { fontSize: 16, fontWeight: "600", color: "#333" },
  size: { color: "#777", fontSize: 13 },

  price: { marginTop: 6, fontSize: 15, fontWeight: "700" },

  bottomRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#F16A26",
  },

  qtyButton: { paddingHorizontal: 8, paddingVertical: 2 },
  qtySymbol: { fontSize: 18, fontWeight: "600", color: "#F16A26" },
  qtyNumber: { fontSize: 16, fontWeight: "600", marginHorizontal: 10 },

  totalContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  totalText: { fontSize: 18, fontWeight: "600" },
  totalAmount: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 10,
    color: "#F16A26",
  },
  buyBtn: {
    backgroundColor: "#F16A26",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buyText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
export default cartStyles;
