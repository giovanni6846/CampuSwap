import AsyncStorage from '@react-native-async-storage/async-storage';

export async function create_activities(name, description, startDate, endDate, seats ) {
    try {
        const response = await fetch("http://10.6.0.7:28000/activities/creation", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken')
            },
            body: JSON.stringify({
                name: name,
                datdeb: startDate,
                datfin: endDate,
                description: description,
                seats: seats,
                user_created: await AsyncStorage.getItem('user_id'),
            }),
        });

        return response.json();
    } catch (error) {
        console.error("Erreur lors de la création de l'activité :", error);
    }
}