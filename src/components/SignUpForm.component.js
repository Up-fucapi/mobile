import React, { useState } from "react";
import { TextInput, View } from "react-native";

function SignUpForm({ data, onChangeData }) {
    return (
        <View>
            <TextInput
                placeholder="Nome de usuario"
                value={data.username}
                onChangeText={(value) => onChangeData("username", value)}
            >
            </TextInput>
            <TextInput
                placeholder="Email"
                value={data.email}
                onChangeText={(value) => onChangeData("email", value)}>

            </TextInput>
            <TextInput
                placeholder="Senha"
                value={data.password}
                onChangeText={(value) => onChangeData("password", value)}>
            </TextInput>
        </View>
    );
}

export default SignUpForm