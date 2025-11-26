import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-root-toast";
import { create_activities } from "../functions/Create_activities";
import formStyles from "../styles/create/styles_create"; // ⚠️ On va créer ce style

export default function CreateEventScreen() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [startDate, setStartDate] = useState(""); // JJ/MM/AAAA
    const [startTime, setStartTime] = useState(""); // HH:mm
    const [endDate, setEndDate] = useState("");     // JJ/MM/AAAA
    const [endTime, setEndTime] = useState("");     // HH:mm

    const [seats, setSeats] = useState("");

    const router = useRouter();

    // --- FORMAT STRICT : Date (JJ/MM/AAAA)
    const formatDate = (t: string) => {
        return t.replace(/[^0-9]/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3")
            .slice(0, 10);
    };

    // --- FORMAT STRICT : Heure (HH:mm)
    const formatHour = (t: string) => {
        return t.replace(/[^0-9]/g, "")
            .replace(/(\d{2})(\d)/, "$1:$2")
            .slice(0, 5);
    };

    // --- Fusionner en ISO8601
    const mergeToISO = (date: string, time: string) => {
        const [d, m, y] = date.split("/");
        return `${y}-${m}-${d}T${time}:00`;
    };

    // --- Sauvegarde
    const handleSave = async () => {
        if (!name || !description || !startDate || !startTime || !endDate || !endTime || !seats) {
            return Alert.alert("Erreur", "Veuillez remplir tous les champs !");
        }

        const startISO = mergeToISO(startDate, startTime);
        const endISO = mergeToISO(endDate, endTime);

        if (new Date(startISO) > new Date(endISO)) {
            return Alert.alert("Erreur", "La date de début ne peut pas être supérieure à la date de fin !");
        }

        const response = await create_activities(name, description, startISO, endISO, seats);

        Toast.show(`${response.message}`, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.TOP,
            backgroundColor: '#e74c3c',
            textColor: 'white',
        });

        router.replace('/menu');
    };

    return (
        <View style={formStyles.container}>
            <Text style={formStyles.title}>Créer un Événement</Text>

            <Text style={formStyles.label}>Nom de l&#39;événement</Text>
            <TextInput style={formStyles.input} value={name} onChangeText={setName} placeholder="Ex: Tournoi FIFA" />

            <Text style={formStyles.label}>Description</Text>
            <TextInput
                style={[formStyles.input, formStyles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder="Décrivez l'événement..."
                multiline
            />

            {/* --- DATE + HEURE DEBUT --- */}
            <View style={formStyles.row}>
                <View style={formStyles.col}>
                    <Text style={formStyles.label}>Date Début</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="JJ/MM/AAAA"
                        value={startDate}
                        onChangeText={(t) => setStartDate(formatDate(t))}
                        keyboardType="numeric"
                    />
                </View>

                <View style={formStyles.col}>
                    <Text style={formStyles.label}>Heure Début</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="HH:mm"
                        value={startTime}
                        onChangeText={(t) => setStartTime(formatHour(t))}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            {/* --- DATE + HEURE FIN --- */}
            <View style={formStyles.row}>
                <View style={formStyles.col}>
                    <Text style={formStyles.label}>Date Fin</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="JJ/MM/AAAA"
                        value={endDate}
                        onChangeText={(t) => setEndDate(formatDate(t))}
                        keyboardType="numeric"
                    />
                </View>

                <View style={formStyles.col}>
                    <Text style={formStyles.label}>Heure Fin</Text>
                    <TextInput
                        style={formStyles.input}
                        placeholder="HH:mm"
                        value={endTime}
                        onChangeText={(t) => setEndTime(formatHour(t))}
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <Text style={formStyles.label}>Nombre de places disponibles</Text>
            <TextInput
                style={formStyles.input}
                placeholder="Ex: 10"
                value={seats}
                onChangeText={(t) => setSeats(t.replace(/[^0-9]/g, ""))}
                keyboardType="numeric"
            />

            <TouchableOpacity style={formStyles.btnSave} onPress={handleSave}>
                <Text style={formStyles.btnText}> Enregistrer </Text>
            </TouchableOpacity>

            <TouchableOpacity style={formStyles.btnCancel} onPress={() => router.back()}>
                <Text style={formStyles.btnText}> Annuler </Text>
            </TouchableOpacity>
        </View>
    );
}
