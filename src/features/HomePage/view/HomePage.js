import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Navbar from "../../../components/Navbar.component";
import { colors } from "../../../theme";

function HomePage({ navigation }) {
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation} />

            <View style={styles.conteudo}>
                <Text style={styles.titulo}>Fucapi+</Text>
                <Text style={styles.subtitulo}>
                    Conheça os cursos em vídeo. Crie sua conta ou entre para começar.
                </Text>

                <Pressable
                    style={styles.botao}
                    onPress={() => navigation.navigate("Cursos")}
                >
                    <Text style={styles.botaoTexto}>Ver cursos</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 12 },
    conteudo: { marginTop: 60, alignItems: "center", paddingHorizontal: 16 },
    titulo: { fontSize: 32, fontWeight: "bold", color: colors.primary },
    subtitulo: { fontSize: 15, color: colors.muted, textAlign: "center", marginTop: 8 },
    botao: {
        backgroundColor: colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 32,
        marginTop: 24,
    },
    botaoTexto: { color: colors.white, fontSize: 16, fontWeight: "700" },
});

export default HomePage
