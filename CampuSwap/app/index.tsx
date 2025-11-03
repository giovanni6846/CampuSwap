import React, { useState } from "react";
import { View, Image, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import styles from "../styles/index/styles_index";
import { login } from '../functions/Login_app';
import { useRouter } from 'expo-router';

interface LoginApiResponse {
   message: string;
   token?: string;
   user_Id?: string;
   error?: string;
   statusCode?: number;
}

export default function LoginScreen() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const handleLogin = async () => {
      if (email === "" || password === "") {
         Alert.alert("Veuillez renseigner les champs identifiant / password");
      } else {
         const response = await login(email, password) as LoginApiResponse;
         if (response.error) {
            setError(`Erreur ${response.statusCode} : ${response.message}`);
         } else {
            router.replace('/menu');
         }
      }
   };

   const create = async () => {
      /*if (email === "" || password === "") {
         Alert.alert("Veuillez renseigner les champs identifiant / password");
      } else {
         const response = await login(email, password) as LoginApiResponse;
         if (response.error) {
            setError(`Erreur ${response.statusCode} : ${response.message}`);
         } else {
            router.replace('/menu');
         }
      }*/
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
         {error ? (
            <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
               {error}
            </Text>
         ) : null}
         <View style={styles.button}>
            <TouchableOpacity onPress={handleLogin}>
               <Text style={styles.text}> Se connecter </Text>
            </TouchableOpacity>
         </View>

         <Text style={styles.text_or}> ou </Text>

         <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
         />

         <View style={styles.button_create}>
            <TouchableOpacity onPress={create}>
               <Text style={styles.text}> Créer un compte </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}
