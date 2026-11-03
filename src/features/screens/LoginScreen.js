// Onde colocar: MOBILE (src/features/screens/LoginScreen.js)
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // URL do seu backend hospedado no Render (ex: https://meu-projeto.onrender.com)
  const API_URL = 'https://backend-up-enna.onrender.com'; 

  // Função para Entrar (chamando o backend)
  async function handleLogin() {
    if (!email || !password) return Alert.alert("Aviso", "Preencha e-mail e senha.");

    try {
      const response = await fetch(`${API_URL}/login`, { // Ajuste a rota conforme a sua API do backend (/login ou /signin)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao fazer login.");
      }

      Alert.alert("Sucesso!", "Login realizado com sucesso.");
      // *Verification:* Se o login deu certo, volta para a tela de cursos ou painel
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro ao entrar", error.message);
    }
  }

  // Função para Criar Conta (chamando o backend)
  async function handleRegister() {
    if (!email || !password) return Alert.alert("Aviso", "Preencha e-mail e senha.");

    try {
      const response = await fetch(`${API_URL}/register`, { // Ajuste a rota conforme a sua API (/register ou /signup)
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar conta.");
      }

      Alert.alert("Sucesso!", "Conta criada com sucesso! Faça login para continuar.");
      // *Verification:* Conta cadastrada com sucesso no banco de dados via backend
    } catch (error) {
      Alert.alert("Erro ao criar conta", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acesse sua Conta</Text>

      <TextInput 
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholderTextColor="#888"
      />

      <TextInput 
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#888"
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, styles.botaoCriar]} onPress={handleRegister}>
        <Text style={styles.textoBotao}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  input: { backgroundColor: '#f5f5f5', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#ddd', color: '#333' },
  botao: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  botaoCriar: { backgroundColor: '#34C759' },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});