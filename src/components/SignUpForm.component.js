import React from "react";
import { TextInput, View, StyleSheet } from "react-native";

function SignUpForm({ data, onChangeData }) {
    return (
        <View>
            <TextInput
                placeholder="Nome de usuário"
                value={data.username}
                onChangeText={(value) => onChangeData("username", value)}
                style={styles.input}
                placeholderTextColor="#7b7b7b"
            />
            <TextInput
                placeholder="Email"
                value={data.email}
                onChangeText={(value) => onChangeData("email", value)}
                style={styles.input}
                placeholderTextColor="#7b7b7b"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Senha"
                value={data.password}
                onChangeText={(value) => onChangeData("password", value)}
                style={styles.input}
                placeholderTextColor="#7b7b7b"
                secureTextEntry
                autoCapitalize="none"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#f3f4f6",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 15,
        color: "#111827",
    },
});

export default SignUpForm
