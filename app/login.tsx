import React, { useEffect, useState } from 'react';
import { View, Image, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import styles from "../styles/index/styles_index";
import { login } from '../functions/Login_app';
import { useRouter } from 'expo-router';
import { Test } from '../functions/Test';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { maj_offline } from '../functions/Offline';

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
   const [error, setError] = useState("");
   const router = useRouter();

   const handleLogin = async () => {
      if (email === "" || password === "") {
         Alert.alert("Veuillez renseigner les champs identifiant / password");
      } else {
         await AsyncStorage.setItem('log','false');
         const response = await login(email, password) as LoginApiResponse;
         if (response.error) {
            setError(`Erreur ${response.statusCode} : ${response.message}`);
         } else {
            if (await AsyncStorage.getItem('isAdmin') === 'true') {
               await AsyncStorage.setItem('log','true');
               router.replace('/admin');
            } else {
               await AsyncStorage.setItem('log','true');
               await maj_offline()
               router.replace('/menu');
            }
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

   const modeHL = async () => {
      await AsyncStorage.setItem('log','false');
      const response    = await Test();
      if (!response.ok){
         Toast.show(`${response.message}`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: 'red',
            textColor: 'white',
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
         });
         router.replace('/activities');
      }
   };

   useEffect(() => {
      modeHL();
   }, []);

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
            <TouchableOpacity onPress={() => router.push('./create')}>
               <Text style={styles.text}> Créer un compte </Text>
            </TouchableOpacity>
         </View>
      </View>
   );
}
