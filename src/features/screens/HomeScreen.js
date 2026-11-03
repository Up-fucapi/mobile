// Onde colocar: MOBILE (src/screens/HomeScreen.js ou na pasta principal)
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo aos Cursos!</Text>
      <Text style={styles.subtitulo}>Aprenda desenvolvimento e tecnologia.</Text>

      {/* Botão que leva para a tela de Login/Cadastro */}
      <TouchableOpacity 
        style={styles.botaoCurso} 
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textoBotao}>Fazer Curso</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5', padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitulo: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  botaoCurso: { backgroundColor: '#007AFF', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 8 },
  textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 18 }
});