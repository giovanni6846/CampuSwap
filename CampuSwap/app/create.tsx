import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import styles from "../styles/index/styles_index";
import { login } from '../functions/Login_app';
import { useRouter } from 'expo-router';
import { Test } from '../functions/Test';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { maj_offline } from '../functions/Offline';
import { create_user } from '../functions/Create_user';

interface LoginApiResponse {
   message: string;
   token?: string;
   user_Id?: string;
   isAdmin?: boolean;
   error?: string;
   statusCode?: number;
}

export default function LoginScreen() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [username, setUsername] = useState("");
   const [error, setError] = useState("");
   const router = useRouter();

   const handleLogin = async () => {
      if (email === "" || password === "" || username === "" ) {
         Toast.show(`Veuillez renseigner tout vos champs !`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: 'red',
            textColor: 'white',
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
         });
      } else {
         const response = await create_user(email, password, username);
         if (response.message !== ""){
            Toast.show(`Demande de création de compte envoyé, veuillez regarder vos mails !`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: 'green',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
            router.push('/login');
         }
         else{
            Toast.show(`Erreur lors de la création de l'utilisateur`, {
               duration: Toast.durations.SHORT,
               position: Toast.positions.TOP,
               backgroundColor: 'red',
               textColor: 'white',
               shadow: true,
               animation: true,
               hideOnPress: true,
               delay: 0,
            });
         }
      }
   };

   return (
      <View style={styles.container}>
         <Image
            style={styles.logo}
            source={require("../pictures/icones/logo.png")}
         />
         <Text style={styles.title}>Création d&#39;un compte</Text>
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
         <TextInput
            style={styles.input}
            placeholder="Nom Utilisateur"
            value={username}
            onChangeText={setUsername}
            secureTextEntry
         />
         {error ? (
            <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>
               {error}
            </Text>
         ) : null}
         <View style={styles.button}>
            <TouchableOpacity onPress={handleLogin}>
               <Text style={styles.text}> Créer un compte </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}
