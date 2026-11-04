import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image, Alert } from "react-native";
import AuthModal from "./AuthModal.component.js";
import GetMenuComponents from "../data/MenuComponents.js";
import useSignIn from "../features/HomePage/hook/useSignIn.js";
import useSignUp from "../features/HomePage/hook/useSignUp.js";

function Navbar({ navigation }) {
    const menu = GetMenuComponents("naologado", {
        home: () => navigation.navigate("Home"),
        signUp: () => {
            setErro("")
            setModalMode("signup")
            setModalAuthV(true)
        },
        signIn: () => {
            setErro("")
            setModalMode("signin")
            setModalAuthV(true)
        },
        profile: () => navigation.navigate("Profile"),
    });
    const [loading, setLoading] = useState(false)
    const [authmodalV, setModalAuthV] = useState(false);
    const [modalmode, setModalMode] = useState("");
    const [erro, setErro] = useState("");
    const handleSignIn = useSignIn(setLoading);
    const handleSignUp = useSignUp(setLoading);
    const handleSubmit = async ({ user }) => {
        setErro("")

        if (!user.email?.trim() || !user.password) {
            setErro("Preencha email e senha.")
            return
        }
        if (modalmode === "signup" && !user.username?.trim()) {
            setErro("Preencha o nome de usuário.")
            return
        }

        try {
            if (modalmode === "signin") {
                const result = await handleSignIn({ user })
                setModalAuthV(false)
                Alert.alert(
                    "Login realizado",
                    `Bem-vindo(a), ${result?.usuario?.nome ?? ""}!`,
                    [{ text: "Ver cursos", onPress: () => navigation.navigate("Cursos") }]
                )
            } else {
                await handleSignUp({ user })
                setModalAuthV(false)
                Alert.alert("Conta criada", "Cadastro feito com sucesso! Agora entre com seu email e senha.")
            }
        } catch (issue) {
            setErro(issue?.message ?? "Erro inesperado. Tente novamente.")
        }
    }
    return (
        <View style={styles.container}>
            <Image
                source={menu.logoImg}
                style={styles.logo}
                resizeMode="contain"></Image>
            {
                menu.itens.map((item, index) => (
                    <Pressable
                        key={index}
                        onPress={item.onPress}
                        style={styles.linkbox}>
                        {
                            item.type === "text" ? (
                                <Text style={styles.linktext}>{item.label}</Text>
                            ) : (
                                <Image
                                    source={item.icon}
                                    style={styles.icon}
                                    resizeMode="contain"
                                />
                            )
                        }
                    </Pressable>
                ))
            }
            <AuthModal
                visible={authmodalV}
                onClose={() => setModalAuthV(false)}
                mode={modalmode}
                onSubmit={handleSubmit}
                loading={loading}
                error={erro}>
            </AuthModal>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: "#327dbb",
        borderRadius: 8,
        marginTop: 40,
    },
    logo: {
        width: 100,
        height: 50,
        padding: 4,
    },
    icon: {
        width: 50,
        height: 25,
        padding: 3,
    },
    linkbox: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    linktext: {
        color: "#FFFFFF",
        fontSize: 14,
    },
});

export default Navbar