import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

// Import Screens
import BiodataScreen from "./src/screens/BiodataScreen";
import KontakScreen from "./src/screens/KontakScreen";
import KalkulatorScreen from "./src/screens/KalkulatorScreen";
import CuacaScreen from "./src/screens/CuacaScreen";
import BeritaScreen from "./src/screens/BeritaScreen";

// a) Splash Screen Component
const InitialSplash = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Data Anda (GANTI dengan data aktual Anda!)
  const appData = {
    title: "UTS MOBILE",
    name: "ABYAN ARDI A.N",
    nim: "152022203",
    photoUrl: "https://picsum.photos/id/64/100/100" 
  };

  useEffect(() => {
    // Timer 5 detik
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, 5000); 
    
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <View style={splashStyles.container}>
      <Text style={splashStyles.title}>{appData.title}</Text>
      <Image source={{ uri: appData.photoUrl }} style={splashStyles.photo} />
      <Text style={splashStyles.text}>{appData.nim}</Text>
      <Text style={splashStyles.text}>{appData.name}</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

const splashStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#004D40", 
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#fff",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginVertical: 4,
    fontWeight: "600"
  },
});


// b) Bottom Tab Navigation (Dashboard)
const Tab = createBottomTabNavigator();

const Dashboard = () => {
  return (
    <Tab.Navigator
      initialRouteName="Biodata"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let IconComponent = Ionicons;

          if (route.name === "Biodata") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Kontak") {
            iconName = focused ? "address-book" : "address-book-outline";
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === "Kalkulator") {
            iconName = focused ? "calculator" : "calculator-outline";
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === "Cuaca") {
            iconName = focused ? "weather-cloudy" : "weather-cloudy-outline";
            IconComponent = MaterialCommunityIcons;
          } else if (route.name === "Berita") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          }
          return <IconComponent name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#004D40", 
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Biodata" component={BiodataScreen} />
      <Tab.Screen name="Kontak" component={KontakScreen} />
      <Tab.Screen name="Kalkulator" component={KalkulatorScreen} />
      <Tab.Screen name="Cuaca" component={CuacaScreen} />
      <Tab.Screen name="Berita" component={BeritaScreen} />
    </Tab.Navigator>
  );
};

// Main App Component
export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Sembunyikan splash screen bawaan Expo
    SplashScreen.preventAutoHideAsync();
    return () => SplashScreen.hideAsync(); 
  }, []);

  const handleSplashFinish = async () => {
    setIsAppReady(true);
    await SplashScreen.hideAsync();
  };

  return (
    <NavigationContainer>
      <Dashboard />
      {/* Tampilkan Splash Screen di atas navigasi utama */}
      {!isAppReady && <InitialSplash onFinish={handleSplashFinish} />}
    </NavigationContainer>
  );
}