import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Button, Platform, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { format } from "date-fns";

// --- IMPORT GAMBAR LOKAL ---
const FotoProfil = require('../../assets/pp.jpg');

const BiodataScreen = () => {
  const [prodi, setProdi] = useState("TI");
  const [gender, setGender] = useState("L");
  const [alamat, setAlamat] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (Platform.OS !== "ios") {
      setShowPicker(false);
    }
    setDate(currentDate);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={FotoProfil} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>ABYAN ARDY A.N</Text>
        <Text style={styles.nim}>152022203</Text>
      </View>

      <View style={styles.card}>
        {/* Dropdown */}
        <Text style={styles.label}>Program Studi (Dropdown)</Text>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={prodi}
            onValueChange={(itemValue) => setProdi(itemValue)}
            style={{ height: 50, width: "100%" }}
          >
            <Picker.Item label="Teknik Informatika" value="TI" />
            <Picker.Item label="Sistem Informasi" value="SI" />
            <Picker.Item label="Manajemen" value="MJ" />
          </Picker>
        </View>

        {/* Radio Button */}
        <Text style={styles.label}>Jenis Kelamin (Pilihan)</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity 
            style={[styles.radioOption, gender === "L" && styles.radioSelected]}
            onPress={() => setGender("L")}
          >
            <Text style={gender === "L" ? { color: "#fff" } : {}}>Laki-laki</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.radioOption, gender === "P" && styles.radioSelected]}
            onPress={() => setGender("P")}
          >
            <Text style={gender === "P" ? { color: "#fff" } : {}}>Perempuan</Text>
          </TouchableOpacity>
        </View>

        {/* Teks Input */}
        <Text style={styles.label}>Alamat (Teks Input)</Text>
        <TextInput 
          style={styles.textInput} 
          placeholder="Masukkan Alamat" 
          value={alamat}
          onChangeText={setAlamat}
        />

        {/* Calendar */}
        <Text style={styles.label}>Tanggal Lahir (Calendar)</Text>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowPicker(true)}>
            <Text style={styles.datePickerText}>{`Pilih Tanggal: ${format(date, "dd MMMM yyyy")}`}</Text>
        </TouchableOpacity>
        
        {/* HANYA RENDER JIKA showPicker bernilai TRUE */}
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default" 
            onChange={onChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f4f8" },
  header: { alignItems: "center", padding: 30, backgroundColor: "#4CAF50" },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 15, borderWidth: 4, borderColor: "#fff" },
  name: { fontSize: 26, fontWeight: "bold", color: "#fff" },
  nim: { fontSize: 18, color: "#fff", opacity: 0.8 },
  card: { backgroundColor: "#fff", margin: 20, padding: 20, borderRadius: 12, elevation: 5 },
  label: { fontSize: 14, marginTop: 15, marginBottom: 5, color: "#555", fontWeight: "bold" },
  inputContainer: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, marginBottom: 10, overflow: "hidden" },
  textInput: { borderWidth: 1, borderColor: "#ccc", padding: 12, borderRadius: 8 },
  radioGroup: { flexDirection: "row", justifyContent: "flex-start", marginVertical: 10 },
  radioOption: {
    padding: 10,
    paddingHorizontal: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 20,
  },
  radioSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  datePickerButton: {
    padding: 12,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  datePickerText: {
    color: "#333",
    fontWeight: "600"
  }
});

export default BiodataScreen;