import React from "react";
import { View } from "react-native";
import Navbar from "../../../components/Navbar.component";
import SignUpForm from "../../../components/SignUpForm.component";

function HomePage({ navigation }) {
    return (
        <View>
            <Navbar
                navigation={navigation}
            />
        </View>
    );
}

export default HomePage