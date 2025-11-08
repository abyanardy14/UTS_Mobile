import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

// --- IMPORT GAMBAR LOKAL SEKALI SAJA ---
const FotoProfilSplash = require("./assets/pp.jpg");

// Import Screens
import BiodataScreen from "./src/screens/BiodataScreen";
import KontakScreen from "./src/screens/KontakScreen";
import KalkulatorScreen from "./src/screens/KalkulatorScreen";
import CuacaScreen from "./src/screens/CuacaScreen";
import BeritaScreen from "./src/screens/BeritaScreen";

// Waktu Splash Screen 5 detik (diganti menjadi 3 detik sesuai kode Anda)
const SPLASH_DURATION = 3000; 

const InitialSplash = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  const appData = {
    title: "UTS MOBILE",
    name: "ABYAN ARDY A.N",
    nim: "15-2022-203",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onFinish();
    }, SPLASH_DURATION);
    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!isVisible) return null;

  return (
    <View style={splashStyles.container}>
      <StatusBar hidden={true} />
      <Text style={splashStyles.title}>{appData.title}</Text>
      {/* Menggunakan variabel FotoProfilSplash */}
      <Image source={FotoProfilSplash} style={splashStyles.photo} />
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
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 40 },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#fff",
  },
  text: { fontSize: 18, color: "#fff", marginVertical: 4, fontWeight: "600" },
});

const Tab = createBottomTabNavigator();

const Dashboard = () => (
  <Tab.Navigator
    initialRouteName="Biodata"
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        const icons = {
          Biodata: "user-alt",
          Kontak: "address-book",
          Kalkulator: "calculator",
          Cuaca: focused ? "cloud-sun" : "cloud",
          Berita: "newspaper",
        };
        
        // Atur solid state: Ikon Font Awesome 5 memerlukan prop 'solid' agar terlihat
        // Kita atur solid=true untuk memastikan ikon selalu muncul, atau fokus pada Cuaca
        const isCuaca = route.name === 'Cuaca';
        const solidState = isCuaca ? focused : true; 

        return <FontAwesome5 
          name={icons[route.name]} 
          size={size} 
          color={color} 
          solid={solidState} // Semua ikon dibuat solid/diisi
        />;
      },
      tabBarActiveTintColor: "#004D40",
      tabBarInactiveTintColor: "gray",
      headerShown: false, // Menyembunyikan header default agar tampilan lebih bersih
    })}
  >
    <Tab.Screen name="Biodata" component={BiodataScreen} />
    <Tab.Screen name="Kontak" component={KontakScreen} />
    <Tab.Screen name="Kalkulator" component={KalkulatorScreen} />
    <Tab.Screen name="Cuaca" component={CuacaScreen} />
    <Tab.Screen name="Berita" component={BeritaScreen} />
  </Tab.Navigator>
);

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.preventAutoHideAsync();
    };
    prepare();
  }, []);

  const handleSplashFinish = async () => {
    setIsAppReady(true);
    // Pastikan status bar muncul setelah splash screen hilang
    StatusBar.setHidden(false); 
    await SplashScreen.hideAsync();
  };

  return (
    <>
      <NavigationContainer>
        <Dashboard />
      </NavigationContainer>
      {/* Jika isAppReady masih false, tampilkan splash screen di atas NavigationContainer */}
      {!isAppReady && <InitialSplash onFinish={handleSplashFinish} />}
    </>
  );
}