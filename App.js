// Onde colocar: MOBILE (App.js)
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomePage from './src/features/HomePage/view/HomePage.js';
import SignInPage from './src/features/SignInPage/view/SignInPage.js';
import SignUpPage from './src/features/SignUpPage/view/SignUpPage.js';
import CursosPage from './src/features/CursosPage/view/CursosPage.js';
import CursoDetalhePage from './src/features/CursoDetalhePage/view/CursoDetalhePage.js';

// 👉 Importação atualizada apontando para a pasta screens dentro de features:
import LoginScreen from './src/features/screens/LoginScreen.js';

const Stack = createStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Cursos"
          screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="SignUp" component={SignUpPage} />
          <Stack.Screen name="SignIn" component={SignInPage} />
          <Stack.Screen name="Cursos" component={CursosPage} />
          <Stack.Screen name="CursoDetalhe" component={CursoDetalhePage} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});