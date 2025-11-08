import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { contacts } from "../data/contactsData";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ContactItem = ({ item }) => (
  <View style={styles.contactItem}>
    <Image 
      source={{ uri: item.avatarUrl }} 
      style={styles.avatar}
    />
    <View style={styles.infoContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.phone}>{item.phone}</Text>
    </View>
    <MaterialCommunityIcons name="phone" size={24} color="#4CAF50" />
  </View>
);

const KontakScreen = () => {
  return (
    <FlatList
      data={contacts}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <ContactItem item={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: { paddingVertical: 5, backgroundColor: "#f0f0f0" },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 4,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phone: {
    fontSize: 14,
    color: "#777",
  },
});

export default KontakScreen;