import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const normalizedEmail = email.toLowerCase();

    const users = [
      { email: 'francesco@live.it', password: 'ciao' },
      { email: 'test@test.com', password: 'password2' },
    ];

    const user = users.find(
      (user) => user.email.toLowerCase() === normalizedEmail && user.password === password
    );

    if (user) {
      const userData = JSON.stringify({ email: user.email });

      AsyncStorage.setItem('userData', userData)
        .then(() => {
          navigation.navigate('News');
        })
        .catch((error) => {
          console.log('Errore durante il salvataggio dei dati:', error);
        });
    } else {
      setError('Email o password non valide');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sun24Container}>
        <Text style={styles.title}>Login</Text>
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Accedi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sun24Container: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 10,
    padding: 20,
    width: '60%',
    alignSelf: 'center',
    marginTop: '55%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Login;
