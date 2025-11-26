import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import styles from "../styles/index/styles_index";
import {create_activities} from "../functions/Create_activities";
import Toast from "react-native-root-toast";

export default function CreateEventScreen() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [seats, setseats] = useState("");

    const router = useRouter();

    const handleSave = async () => {
        if (!name || !description || !startDate || !endDate || !seats) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs !");
        }

        // Vérification simple de date
        if (new Date(startDate) > new Date(endDate)) {
            return Alert.alert("Erreur", "La date de début ne peut pas être supérieure à la date de fin !");
        }

        const response = await create_activities(name, description, startDate, endDate, seats);

        Toast.show(`${response.message}`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: '#e74c3c',
            textColor: 'orange',
            shadow: true,
            animation: true,
            hideOnPress: true,
        });

        router.replace('/menu');
    }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Créer un Événement</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nom de l'événement"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={[styles.input, {height: 100}]}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

                <TextInput
                    style={styles.input}
                    placeholder="Date de début (AAAA-MM-JJ)"
                    value={startDate}
                    onChangeText={setStartDate}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Date de fin (AAAA-MM-JJ)"
                    value={endDate}
                    onChangeText={setEndDate}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nombres de places disponible"
                    value={seats}
                    onChangeText={setseats}
                    keyboardType="numeric"
                />

                <View style={styles.button}>
                    <TouchableOpacity onPress={handleSave}>
                        <Text style={styles.text}> Enregistrer </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.button_create}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Text style={styles.text}> Annuler </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
}
