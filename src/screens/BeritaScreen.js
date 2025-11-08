import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { news } from "../data/newsData";

const NewsItem = ({ item }) => (
  <View style={styles.newsCard}>
    <Image 
      source={{ uri: item.imageUrl }} 
      style={styles.newsImage}
      resizeMode="cover"
    />
    <View style={styles.textContainer}>
      <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.source}>Sumber: {item.source}</Text>
    </View>
  </View>
);

const BeritaScreen = () => {
  return (
    <FlatList
      data={news}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <NewsItem item={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 10, backgroundColor: "#f0f0f0" },
  newsCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 8,
    overflow: "hidden",
    elevation: 3,
    flexDirection: "row",
  },
  newsImage: {
    width: 120, 
    height: 100, 
  },
  textContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  source: {
    fontSize: 12,
    color: "#777",
    fontStyle: "italic",
  },
});

export default BeritaScreen;