import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
  Alert,
  Picker,
} from "react-native";
import { AppContext } from "../Context/AppContext";
import { supabase } from "../services/supabase";

export default function Cuenta({ navigation }) {
  const { usuario, idioma, tema, texto, setUsuario } = useContext(AppContext);
  const [name, setName] = useState(usuario?.nombre || "");
  const [provincia, setProvincia] = useState(usuario?.idprovincia || "");
  const [canton, setCanton] = useState(usuario?.idcanton || "");
  const [distrito, setDistrito] = useState(usuario?.iddistrito || "");
  const [direccion, setDireccion] = useState(usuario?.direccionexacta || "");
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const cargarProvincias = async () => {
      const { data, error } = await supabase.from("provincias").select("*");
      if (error) {
        console.error("Error cargando provincias:", error);
      } else {
        setProvincias(data);
      }
    };
    cargarProvincias();
  }, []);

  useEffect(() => {
    const cargarCantones = async () => {
      if (provincia) {
        const { data, error } = await supabase
          .from("cantones")
          .select("*")
          .eq("idprovincia", provincia);
        if (error) {
          console.error("Error cargando cantones:", error);
        } else {
          setCantones(data);
        }
      }
    };
    cargarCantones();
  }, [provincia]);

  useEffect(() => {
    const cargarDistritos = async () => {
      if (canton) {
        const { data, error } = await supabase
          .from("distritos")
          .select("*")
          .eq("idcanton", canton);
        if (error) {
          console.error("Error cargando distritos:", error);
        } else {
          setDistritos(data);
        }
      }
    };
    cargarDistritos();
  }, [canton]);

  const handleSave = async () => {
    const updatedUser = {
      ...usuario,
      nombre: name,
      idprovincia: provincia,
      idcanton: canton,
      iddistrito: distrito,
      direccionexacta: direccion,
    };

    const { error } = await supabase
      .from("usuarios")
      .update(updatedUser)
      .eq("id", usuario.id);

    if (error) {
      Alert.alert(
        idioma === "es" ? "Error" : "Error",
        idioma === "es"
          ? "No se pudo actualizar la información del usuario."
          : "Failed to update user information."
      );
    } else {
      setUsuario(updatedUser);
      Alert.alert(
        idioma === "es" ? "Éxito" : "Success",
        idioma === "es"
          ? "Información actualizada correctamente."
          : "Information updated successfully."
      );
    }
  };

  const handleLogout = () => {
    setUsuario(null);
    alert(idioma === "es" ? "Sesión cerrada" : "Logged out");
    navigation.navigate("Login");
  };

  // Estilos dinámicos solo para los elementos que los mantienen
  const dynamicStyles = {
    textColor: tema === "dark" ? "#fff" : "#000",
    backgroundColor: tema === "dark" ? "#333" : "#f9f9f9",
    inputBackground: tema === "dark" ? "#444" : "#fff",
    inputBorderColor: tema === "dark" ? "#666" : "#ccc",
    fontSize: texto === "sm" ? 14 : texto === "md" ? 16 : 18,
  };

  return (
    <ScrollView
      style={[styles.main, { backgroundColor: dynamicStyles.backgroundColor }]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: dynamicStyles.textColor,
            fontSize: dynamicStyles.fontSize + 4,
          },
        ]}
      >
        {idioma === "es" ? "Cuenta" : "Account"}
      </Text>

      {/* Campo: Nombre */}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>
        {idioma === "es" ? "Nombre:" : "Name:"}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dynamicStyles.inputBackground,
            borderColor: dynamicStyles.inputBorderColor,
            color: dynamicStyles.textColor,
            fontSize: dynamicStyles.fontSize,
          },
        ]}
        value={name}
        onChangeText={setName}
        placeholder={idioma === "es" ? "Nombre de usuario" : "Username"}
        placeholderTextColor={tema === "dark" ? "#aaa" : "#888"}
      />

      {/* Campo: Provincia */}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>
        {idioma === "es" ? "Provincia:" : "Province:"}
      </Text>
      <Picker
        selectedValue={provincia}
        style={styles.picker}
        onValueChange={(value) => setProvincia(value)}
      >
        <Picker.Item
          label={
            idioma === "es" ? "Seleccione una provincia" : "Select a province"
          }
          value=""
        />
        {provincias.map((prov) => (
          <Picker.Item key={prov.id} label={prov.nombre} value={prov.id} />
        ))}
      </Picker>

      {/* Campo: Cantón */}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>
        {idioma === "es" ? "Cantón:" : "Canton:"}
      </Text>
      <Picker
        selectedValue={canton}
        style={styles.picker}
        onValueChange={(value) => setCanton(value)}
        enabled={!!provincia}
      >
        <Picker.Item
          label={idioma === "es" ? "Seleccione un cantón" : "Select a canton"}
          value=""
        />
        {cantones.map((cant) => (
          <Picker.Item key={cant.id} label={cant.nombre} value={cant.id} />
        ))}
      </Picker>

      {/* Campo: Distrito */}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>
        {idioma === "es" ? "Distrito:" : "District:"}
      </Text>
      <Picker
        selectedValue={distrito}
        style={styles.picker}
        onValueChange={(value) => setDistrito(value)}
        enabled={!!canton}
      >
        <Picker.Item
          label={
            idioma === "es" ? "Seleccione un distrito" : "Select a district"
          }
          value=""
        />
        {distritos.map((dist) => (
          <Picker.Item key={dist.id} label={dist.nombre} value={dist.id} />
        ))}
      </Picker>

      {/* Campo: Dirección exacta */}
      <Text style={[styles.label, { color: dynamicStyles.textColor }]}>
        {idioma === "es" ? "Dirección exacta:" : "Exact address:"}
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: dynamicStyles.inputBackground,
            borderColor: dynamicStyles.inputBorderColor,
            color: dynamicStyles.textColor,
            fontSize: dynamicStyles.fontSize,
          },
        ]}
        value={direccion}
        onChangeText={setDireccion}
        placeholder={idioma === "es" ? "Dirección exacta" : "Exact address"}
        placeholderTextColor={tema === "dark" ? "#aaa" : "#888"}
      />

      {/* Botones */}
      <Button
        title={idioma === "es" ? "Guardar Cambios" : "Save Changes"}
        onPress={handleSave}
      />
      <Button
        title={idioma === "es" ? "Cerrar sesión" : "Logout"}
        onPress={handleLogout}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontWeight: "bold",
    margin: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    width: "100%",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
});
