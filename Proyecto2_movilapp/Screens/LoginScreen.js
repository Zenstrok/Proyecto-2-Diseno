import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_Eats_Logo.svg',
        }}
        style={styles.logo}
      />

      {/* Título */}
      <Text style={styles.title}>Inicia Sesión</Text>

      {/* Campo de Correo */}
      <TextInput
        placeholder="Correo electrónico"
        placeholderTextColor="#999"
        style={styles.input}
      />

      {/* Campo de Contraseña */}
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#999"
        secureTextEntry={true}
        style={styles.input}
      />

      {/* Botón de Iniciar Sesión */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      {/* Texto de Registro */}
      <Text style={styles.registerText}>
        ¿No tienes cuenta? <Text style={styles.registerLink}>Regístrate</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    fontSize: 14,
    color: '#999',
  },
  registerLink: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
