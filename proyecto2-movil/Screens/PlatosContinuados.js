import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppContext } from "../Context/AppContext";

export default function PlatosContinuados() {
  const { state } = useContext(AppContext);
  const { isDarkMode, isEnglish } = state;

  const styles = StyleSheet.create({
    main: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
    },
    headerText: {
      fontSize: 24,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#f1593e",
      margin: 20,
      textAlign: "center",
    },
  });

  return (
    <View style={styles.main}>
      <Text style={styles.headerText}>
        {isEnglish
          ? "Continued Dishes Functionality"
          : "Funcionalidad de Platos Continuados"}
      </Text>
    </View>
  );
}
