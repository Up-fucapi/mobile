import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Navbar from "../../../components/Navbar.component";
import { MenuComponents } from "../../../data/MenuComponents";

function SignUpPage({ navigation }) {
    return (
        <View>
            <Navbar
                logoImg={MenuComponents["naologado"].logoImg}
                itens={MenuComponents["naologado"].itens}
                navigation={navigation}></Navbar>
            <Text>Esta e a pagina de Cadastro</Text>
        </View>
    );
}

const style = StyleSheet.create({

});

export default SignUpPage