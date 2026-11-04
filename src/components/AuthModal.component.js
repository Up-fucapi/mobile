import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import SignInForm from "./SignInForm.component.js";
import SignUpForm from "./SignUpForm.component.js";

function AuthModal({ visible, onClose, mode, onSubmit, loading = false, error = "" }) {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const handleChangeData = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }));
    };

    const isSignIn = mode === "signin";

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : undefined}
                            style={styles.card}
                        >

                            {isSignIn ? (
                                <View>
                                    <Text style={styles.title}>
                                        Logar:
                                    </Text>
                                    <SignInForm
                                        data={user}
                                        onChangeData={handleChangeData}></SignInForm>
                                </View>
                            ) : (
                                <View>
                                    <Text style={styles.title}>
                                        Cadastrar:
                                    </Text>
                                    <SignUpForm
                                        data={user}
                                        onChangeData={handleChangeData}></SignUpForm>
                                </View>
                            )}

                            {error ? <Text style={styles.error}>{error}</Text> : null}

                            {loading ? (
                                <Text style={styles.hint}>
                                    Conectando ao servidor... a primeira vez pode levar cerca de 1 minuto.
                                </Text>
                            ) : null}

                            <TouchableOpacity
                                style={[styles.button, loading && styles.buttonDisabled]}
                                disabled={loading}
                                onPress={() => onSubmit({ user })}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#ffffff" />
                                ) : (
                                    <Text style={styles.buttonLabel}>
                                        {isSignIn ? "Entrar" : "Criar conta"}
                                    </Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                                <Text style={styles.closeText}>Fechar</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(15, 23, 42, 0.55)",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        width: "100%",
        maxWidth: 380,
        backgroundColor: "#ffffff",
        borderRadius: [18, 0, 18, 0],
        padding: 22,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#1f2937",
        marginBottom: 18,
        textAlign: "center",
    },
    button: {
        backgroundColor: "#327dbb",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 8,
    },
    buttonLabel: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "700",
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    error: {
        color: "#b91c1c",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 8,
    },
    hint: {
        color: "#6b7a8c",
        fontSize: 12,
        textAlign: "center",
        marginBottom: 8,
    },
    closeButton: {
        marginTop: 14,
        alignItems: "center",
    },
    closeText: {
        color: "#327dbb",
        fontWeight: "600",
        fontSize: 14,
    },
});

export default AuthModal;