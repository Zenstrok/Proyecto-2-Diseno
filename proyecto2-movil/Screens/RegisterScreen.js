import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { insertData, supabase } from "../services/supabase";

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    correoelectronico: "",
    provincia: "",
    canton: "",
    distrito: "",
    direccion: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [provincias, setProvincias] = useState([]);
  const [cantones, setCantones] = useState([]);
  const [distritos, setDistritos] = useState([]);

  useEffect(() => {
    const importarProvincias = async () => {
      const { data, error } = await supabase.from("provincias").select("*");
      if (error) {
        console.error("Error importing provincias:", error);
      } else {
        setProvincias(data);
      }
    };
    importarProvincias();
  }, []);

  const importarCantones = async (idprovincia) => {
    try {
      const { data, error } = await supabase
        .from("cantones")
        .select("*")
        .eq("idprovincia", idprovincia);
      if (error) {
        throw error;
      }
      setCantones(data);
    } catch (error) {
      console.error("Error importing cantones:", error);
      setCantones([]);
    }
  };

  const importarDistritos = async (idcanton) => {
    try {
      const { data, error } = await supabase
        .from("distritos")
        .select("*")
        .eq("idcanton", idcanton);
      if (error) {
        throw error;
      }
      setDistritos(data);
    } catch (error) {
      console.error("Error importing distritos:", error);
      setDistritos([]);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "provincia") {
      importarCantones(value);
      setFormData((prevData) => ({
        ...prevData,
        canton: "",
        distrito: "",
      }));
      setDistritos([]);
    }

    if (name === "canton") {
      importarDistritos(value);
      setFormData((prevData) => ({
        ...prevData,
        distrito: "",
      }));
    }
  };

  const manejarRegistro = async () => {
    const {
      password,
      nombre,
      apellido1,
      apellido2,
      telefono,
      correoelectronico,
      provincia,
      canton,
      distrito,
      direccion,
    } = formData;

    /* const { salt, hash } = await newHashPassword(password); */
    var salt = "";
    var hash = password;

    const newUser = {
      nombre,
      apellido1,
      apellido2,
      telefono: parseInt(telefono, 10),
      correoelectronico,
      idprovincia: parseInt(provincia, 10),
      idcanton: parseInt(canton, 10),
      iddistrito: parseInt(distrito, 10),
      direccionexacta: direccion,
      idtema: 1,
      ididioma: 1,
      idtexto: 1,
      salt: salt || "",
      hash: hash,
    };

    const result = await insertData("usuarios", newUser);
    if (result) {
      Alert.alert("Registro exitoso");
      setMessage("Usuario registrado con éxito.");
      setFormData({
        nombre: "",
        apellido1: "",
        apellido2: "",
        telefono: "",
        correoelectronico: "",
        provincia: "",
        canton: "",
        distrito: "",
        direccion: "",
        password: "",
      });
      navigation.navigate("Login");
    } else {
      Alert.alert("Registro fallido");
      setMessage("Error al registrar el usuario.");
    }
  };

  return (
    <ScrollView style={[styles.contenedor, { backgroundColor: "#ffffff" }]}>
      <Text style={[styles.titulo, { color: "#000" }]}>{"Registro"}</Text>
      <TextInput
        style={styles.entrada}
        placeholder={"Nombre"}
        value={formData.nombre}
        onChangeText={(value) => handleChange("nombre", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Primer apellido"}
        value={formData.apellido1}
        onChangeText={(value) => handleChange("apellido1", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Segundo apellido"}
        value={formData.apellido2}
        onChangeText={(value) => handleChange("apellido2", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Número de teléfono"}
        keyboardType="phone-pad"
        value={formData.telefono}
        onChangeText={(value) => handleChange("telefono", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Correo electrónico"}
        keyboardType="email-address"
        value={formData.correoelectronico}
        onChangeText={(value) => handleChange("correoelectronico", value)}
      />
      <Picker
        selectedValue={formData.provincia}
        style={styles.entrada}
        onValueChange={(value) => handleChange("provincia", value)}
      >
        <Picker.Item label={"Seleccione una provincia"} value="" />
        {provincias.map((provincia) => (
          <Picker.Item
            key={provincia.id}
            label={provincia.nombre}
            value={provincia.id}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={formData.canton}
        style={styles.entrada}
        onValueChange={(value) => handleChange("canton", value)}
        enabled={!!formData.provincia}
      >
        <Picker.Item label={"Seleccione un cantón"} value="" />
        {cantones.map((canton) => (
          <Picker.Item
            key={canton.id}
            label={canton.nombre}
            value={canton.id}
          />
        ))}
      </Picker>
      <Picker
        selectedValue={formData.distrito}
        style={styles.entrada}
        onValueChange={(value) => handleChange("distrito", value)}
        enabled={!!formData.canton}
      >
        <Picker.Item label={"Seleccione un distrito"} value="" />
        {distritos.map((distrito) => (
          <Picker.Item
            key={distrito.id}
            label={distrito.nombre}
            value={distrito.id}
          />
        ))}
      </Picker>
      <TextInput
        style={styles.entrada}
        placeholder={"Dirección"}
        value={formData.direccion}
        onChangeText={(value) => handleChange("direccion", value)}
      />
      <TextInput
        style={styles.entrada}
        placeholder={"Contraseña"}
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleChange("password", value)}
      />
      <Button title={"Registrarse"} onPress={manejarRegistro} />
      {message && (
        <Text
          style={{
            color: "#000",
            marginTop: 20,
            textAlign: "center",
          }}
        >
          {message}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  entrada: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default RegisterScreen;
