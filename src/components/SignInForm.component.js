import React from "react";
import { View, TextInput, StyleSheet } from "react-native";




function SignInForm({ data, onChangeData }) {
    return (
        <View>
            <TextInput
                placeholder="Email"
                value={data.email}
                onChangeText={(value) => onChangeData("email", value)}
                style={styles.input}
                placeholderTextColor="#7b7b7b"
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Senha"
                value={data.password}
                onChangeText={(value) => onChangeData("password", value)}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#7b7b7b"
            />

        </View>
    )
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

export default SignInForm