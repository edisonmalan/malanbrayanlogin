import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    console.log('Datos del formulario de registro:', { email, username, password });

    // Encriptar la contraseña
    const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
    console.log('Contraseña original:', password);
    console.log('Contraseña encriptada:', encryptedPassword);
    
    const user = {
      email,
      username,
      password: encryptedPassword,
    };

    try {
      await AsyncStorage.setItem(username, JSON.stringify(user));
      console.log('Usuario registrado en AsyncStorage:', user);
      alert('Registro exitoso!');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al registrar usuario:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a Arosemena Cell</Text>
      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="example@domain.com"
      />
      <Text style={styles.label}>Usuario</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Nombre de usuario"
      />
      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="********"
      />
      <Button title="Registrarse" onPress={handleRegister} />
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes una cuenta? Inicia sesión ahora</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  link: {
    marginTop: 15,
    color: '#007bff',
    textAlign: 'center',
  },
});
