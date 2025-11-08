import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SunImage = require('../../assets/sun.png'); 

const staticWeather = {
  city: "Bandung",
  temperature: "28°C",
  condition: "Cerah Berawan",
  humidity: "65%",
  windSpeed: "10 km/h",
};

const CuacaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.cityText}>{staticWeather.city}</Text>
      
      <View style={styles.weatherIconContainer}>
        <Image 
          source={SunImage}
          style={styles.weatherAnimation}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.temperatureText}>{staticWeather.temperature}</Text>
      <Text style={styles.conditionText}>{staticWeather.condition}</Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailCard}>
          <MaterialCommunityIcons name="water-percent" size={30} color="#007AFF" />
          <Text style={styles.detailValue}>{staticWeather.humidity}</Text>
          <Text style={styles.detailLabel}>Kelembapan</Text>
        </View>
        <View style={styles.detailCard}>
          <MaterialCommunityIcons name="weather-windy" size={30} color="#007AFF" />
          <Text style={styles.detailValue}>{staticWeather.windSpeed}</Text>
          <Text style={styles.detailLabel}>Kecepatan Angin</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#64B5F6", 
  },
  cityText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  weatherIconContainer: {
    width: 180,
    height: 180,
    marginBottom: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 90,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  weatherAnimation: {
    width: 150,
    height: 150,
  },
  temperatureText: {
    fontSize: 80,
    fontWeight: "200",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  conditionText: {
    fontSize: 24,
    marginBottom: 40,
    color: "#fff",
  },
  detailsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
  detailCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    width: "45%",
    elevation: 4,
  },
  detailValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  detailLabel: {
    fontSize: 14,
    color: "#888",
  },
});

export default CuacaScreen;