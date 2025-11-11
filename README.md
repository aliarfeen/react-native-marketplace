# 🛒 MarketPlace

**MarketPlace** is a modern and minimal e-commerce mobile application built with **React Native**.  
It provides a smooth shopping experience by allowing users to browse products, view detailed information, and manage their shopping cart efficiently. The app focuses on simplicity, performance, and intuitive navigation.

---

## 🚀 Features

- 🧭 **Simple Navigation** – Clean interface with easy movement between Home, Product Details, Cart, and Login.  
- 💳 **Interactive Cart** – Add, remove, or update product quantities effortlessly.  
- 🔍 **Product Details** – Image, price, description, and category for each product.  
- 🔒 **Authentication (optional)** – Lightweight login system for user sessions.  
- ⚡ **Redux Toolkit Integration** – Efficient state management for products, cart, and authentication.  
- 🌐 **Fake Store API Integration** – Fetches realistic product data.  
- 🎨 **Responsive UI** – Designed for iOS and Android devices with reusable components.  

---

## 🛠 Tools & Technologies

- **React Native** – Main framework  
- **Redux Toolkit** – State management  
- **React Navigation** – Navigation between screens  
- **Axios / Fetch API** – HTTP requests  
- **JavaScript (ES6+)** – Programming language  
- **Babel** – JavaScript compiler  
- **Prettier & ESLint** – Code formatting and linting  
- **VS Code** – Recommended IDE  
- **Android Studio / Xcode** – Testing on emulators and devices  

---

## 🧩 Project Structure

MarketPlace/
│
├── App.js # Entry point of the app
├── package.json # Project dependencies and scripts
├── babel.config.js # Babel configuration
│
├── assets/ # Images and icons
│ ├── logo.png
│ └── icons/
│
├── src/
│ ├── api/
│ │ └── fakeStoreApi.js
│
│ ├── navigation/
│ │ └── AppNavigator.js
│
│ ├── redux/
│ │ ├── store.js
│ │ └── slices/
│ │ ├── authSlice.js
│ │ ├── productSlice.js
│ │ └── cartSlice.js
│
│ ├── screens/
│ │ ├── LoginScreen.js
│ │ ├── HomeScreen.js
│ │ ├── ProductDetailsScreen.js
│ │ └── CartScreen.js
│
│ ├── components/
│ │ ├── ProductCard.js
│ │ ├── CategoryList.js
│ │ └── Header.js
│
│ ├── styles/
│ │ ├── colors.js
│ │ ├── globalStyles.js
│ │ └── screens/
│ │ ├── loginStyles.js
│ │ ├── homeStyles.js
│ │ ├── productDetailsStyles.js
│ │ └── cartStyles.js
│
│ └── utils/
│ └── storage.js
│
└── README.md


## Developers Team & Responsibilities

| Developer | Role / Responsibility |
|-----------|----------------------|
| **Eng. Ali Hesham** | Developed the Home Page and main product browsing interface |
| **Eng. Mustafa** | Developed Product & Product Details Screens, including API integration |
| **Eng. Khairy** | Developed the Login Screen, handling user authentication and validation |
| **Eng. Ahmed Ebrahim** | Managed Redux & State Management, ensuring smooth data flow across the app |
| **Eng. Asmaa Adel** | Designed and implemented the Cart Screen and overall App Structure for maintainability |

---

## ⚡ Installation & Usage

```bash
# Clone the repository
git clone https:aliarfeen/react-native-marketplace
cd MarketPlace

# Install dependencies
npm install

# Run the app
npx react-native run-android   # Android
npx react-native run-ios       # iOS
Enjoy browsing products!

© 2025 MarketPlace. All rights reserved.