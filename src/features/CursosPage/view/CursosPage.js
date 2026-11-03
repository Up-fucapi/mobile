// Onde colocar: MOBILE (src/features/CursosPage/view/CursosPage.js)
import React, { useState, useEffect } from "react";
import {
    View, Text, TextInput, FlatList, Pressable, Image,
    ActivityIndicator, StatusBar, StyleSheet, TouchableOpacity,
} from "react-native";
import { buscarCursos } from "../../../services/api";
import { colors, shadow } from "../../../theme";

function CursosPage({ navigation }) {
    const [busca, setBusca] = useState("");
    const [cursos, setCursos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [origem, setOrigem] = useState("servidor");

    useEffect(() => {
        buscarCursos().then((resultado) => {
            setCursos(resultado.dados);
            setOrigem(resultado.origem);
            setCarregando(false);
        });
    }, []);

    const cursosFiltrados = cursos.filter((curso) =>
        `${curso.nome} ${curso.descricao}`.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <Image
                        source={require("../../../../assets/logo.png")}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    {/* 👉 Botão de Login adicionado no topo */}
                    <TouchableOpacity 
                        style={styles.botaoLoginTopo} 
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.textoBotaoLogin}>Entrar / Criar Conta</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.headerTitulo}>Fucapi+</Text>
                <Text style={styles.headerSubtitulo}>Conheça os cursos em vídeo</Text>
            </View>

            <TextInput
                style={styles.busca}
                placeholder="Buscar curso..."
                placeholderTextColor={colors.muted}
                value={busca}
                onChangeText={setBusca}
                autoCorrect={false}
                clearButtonMode="while-editing"
            />

            {carregando ? (
                <ActivityIndicator size="large" color={colors.primary} style={styles.carregando} />
            ) : (
                <FlatList
                    data={cursosFiltrados}
                    keyExtractor={(curso) => String(curso.id)}
                    contentContainerStyle={styles.lista}
                    keyboardShouldPersistTaps="handled"
                    ListEmptyComponent={
                        <Text style={styles.vazio}>Nenhum curso encontrado.</Text>
                    }
                    ListFooterComponent={
                        origem === "exemplo" ? (
                            <Text style={styles.aviso}>
                                Sem conexão com o servidor. Mostrando dados de exemplo.
                            </Text>
                        ) : null
                    }
                    renderItem={({ item }) => (
                        <Pressable
                            style={({ pressed }) => [styles.card, pressed && styles.cardPressionado]}
                            onPress={() => navigation.navigate("CursoDetalhe", { curso: item })}
                        >
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.descricao} numberOfLines={2}>{item.descricao}</Text>
                            <View style={styles.chips}>
                                <View style={styles.chip}>
                                    <Text style={styles.chipTexto}>{item.carga_horaria}h</Text>
                                </View>
                                <View style={styles.chip}>
                                    <Text style={styles.chipTexto}>{item.professor}</Text>
                                </View>
                            </View>
                            <Text style={styles.verMais}>Ver detalhes ›</Text>
                        </Pressable>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    header: {
        backgroundColor: colors.primary,
        paddingTop: 60,
        paddingBottom: 24,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    logo: { width: 120, height: 36 },
    botaoLoginTopo: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    textoBotaoLogin: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    headerTitulo: { fontSize: 28, fontWeight: "bold", color: colors.white },
    headerSubtitulo: { fontSize: 14, color: colors.white, opacity: 0.85, marginTop: 2 },
    busca: {
        backgroundColor: colors.card,
        borderRadius: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: colors.text,
        marginHorizontal: 16,
        marginTop: 16,
        ...shadow,
    },
    carregando: { marginTop: 40 },
    lista: { padding: 16, paddingBottom: 32 },
    vazio: { fontSize: 15, color: colors.muted, textAlign: "center", marginTop: 24 },
    aviso: { fontSize: 12, color: colors.muted, textAlign: "center", marginTop: 8 },
    card: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        borderLeftWidth: 5,
        borderLeftColor: colors.primary,
        ...shadow,
    },
    cardPressionado: { opacity: 0.75 },
    nome: { fontSize: 18, fontWeight: "bold", color: colors.text, marginBottom: 6 },
    descricao: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    chips: { flexDirection: "row", flexWrap: "wrap", marginTop: 12 },
    chip: {
        backgroundColor: colors.chip,
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,
        marginRight: 8,
        marginBottom: 4,
    },
    chipTexto: { fontSize: 12, color: colors.primaryDark, fontWeight: "600" },
    verMais: { marginTop: 10, fontSize: 14, fontWeight: "600", color: colors.primary },
});

export default CursosPage;