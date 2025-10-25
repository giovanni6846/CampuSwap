
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
import {View, Image, Text, TextInput, Button, Alert, TouchableOpacity} from "react-native";
import styles from "../styles/index/styles_index";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (email === "test@mail.com" && password === "1234") {
            Alert.alert("Succès", "Connexion réussie ✅");
        } else {
            Alert.alert("Erreur", "Identifiants incorrects ❌");
        }
    };

    return (
        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require("../pictures/icones/logo.png")}
            />

            <Text style={styles.title}>Connexion</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={styles.button}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.text}> Se connecter </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


