import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import AuthModal from "./AuthModal.component.js";
import GetMenuComponents from "../data/MenuComponents.js";
import useSignIn from "../features/HomePage/hook/useSignIn.js";
import useSignUp from "../features/HomePage/hook/useSignUp.js";

function Navbar({ navigation }) {
    const menu = GetMenuComponents("naologado", {
        home: () => navigation.navigate("Home"),
        signUp: () => {
            setModalMode("signup")
            setModalAuthV(true)
        },
        signIn: () => {
            setModalMode("signin")
            setModalAuthV(true)
        },
        profile: () => navigation.navigate("Profile"),
    });
    const [loading, setLoading] = useState(false)
    const [authmodalV, setModalAuthV] = useState(false);
    const [modalmode, setModalMode] = useState("");
    const handleSignIn = useSignIn(setLoading);
    const handleSignUp = useSignUp(setLoading);
    const handleSubmit = async (user) => {
        try {
            if (modalmode === "signin") {
                const result = await handleSignIn(user)
                console.log("Dados do Usuario: ", result)
            }
            if (modalmode === "signup") {
                const result = await handleSignUp(user)
                console.log("Usuario Cadastrado: ", result)
            }
            setModalAuthV(false)
        } catch (issue) {
            console.log("erro ao logar",
                issue?.message ?? issue)
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
                onSubmit={handleSubmit}>
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