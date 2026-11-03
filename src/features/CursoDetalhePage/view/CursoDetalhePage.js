import React, { useState, useEffect } from "react";
import {
    View, Text, ScrollView, Pressable, Linking, ActivityIndicator, StatusBar, StyleSheet,
} from "react-native";
import { buscarVideos } from "../../../services/api";
import { colors, shadow } from "../../../theme";

function Linha({ rotulo, valor }) {
    return (
        <View style={styles.linha}>
            <Text style={styles.rotulo}>{rotulo}</Text>
            <Text style={styles.valor}>{valor}</Text>
        </View>
    );
}

function CursoDetalhePage({ route, navigation }) {
    const { curso } = route.params;
    const [videos, setVideos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        buscarVideos(curso.id).then((resultado) => {
            setVideos(resultado.dados);
            setCarregando(false);
        });
    }, [curso.id]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <View style={styles.header}>
                <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
                    <Text style={styles.voltar}>‹ Voltar</Text>
                </Pressable>
                <Text style={styles.titulo}>{curso.nome}</Text>
            </View>

            <ScrollView contentContainerStyle={styles.corpo}>
                <View style={styles.bloco}>
                    <Text style={styles.blocoTitulo}>Sobre o curso</Text>
                    <Text style={styles.texto}>{curso.descricao}</Text>
                </View>

                <View style={styles.bloco}>
                    <Text style={styles.blocoTitulo}>Informações</Text>
                    <Linha rotulo="Carga horária" valor={`${curso.carga_horaria}h`} />
                    <Linha rotulo="Metodologia" valor={curso.metodologia} />
                    <Linha rotulo="Professor" valor={curso.professor} />
                </View>

                <Text style={styles.secao}>Vídeos</Text>
                {carregando ? (
                    <ActivityIndicator color={colors.primary} />
                ) : videos.length === 0 ? (
                    <Text style={styles.vazio}>Nenhum vídeo cadastrado para este curso.</Text>
                ) : (
                    videos.map((video) => (
                        <Pressable
                            key={video.id}
                            style={({ pressed }) => [styles.video, pressed && styles.videoPressionado]}
                            onPress={() => Linking.openURL(video.url)}
                        >
                            <View style={styles.play}>
                                <Text style={styles.playIcone}>▶</Text>
                            </View>
                            <Text style={styles.videoTitulo}>{video.titulo}</Text>
                        </Pressable>
                    ))
                )}
            </ScrollView>
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
    voltar: { fontSize: 16, color: colors.white, opacity: 0.9, marginBottom: 12 },
    titulo: { fontSize: 26, fontWeight: "bold", color: colors.white },
    corpo: { padding: 16, paddingBottom: 40 },
    bloco: {
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 14,
        ...shadow,
    },
    blocoTitulo: { fontSize: 16, fontWeight: "bold", color: colors.primaryDark, marginBottom: 8 },
    texto: { fontSize: 15, color: colors.text, lineHeight: 22 },
    linha: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: colors.background,
    },
    rotulo: { fontSize: 14, color: colors.muted },
    valor: { fontSize: 14, color: colors.text, fontWeight: "600", flexShrink: 1, textAlign: "right", marginLeft: 12 },
    secao: { fontSize: 18, fontWeight: "bold", color: colors.text, marginTop: 10, marginBottom: 12 },
    vazio: { fontSize: 14, color: colors.muted },
    video: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 14,
        marginBottom: 10,
        ...shadow,
    },
    videoPressionado: { opacity: 0.75 },
    play: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
    },
    playIcone: { color: colors.white, fontSize: 14 },
    videoTitulo: { fontSize: 15, color: colors.text, fontWeight: "600", flexShrink: 1 },
});

export default CursoDetalhePage;