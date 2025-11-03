import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Inscription(user_id, activity_id){
   try {
      const response = await fetch("http://10.205.124.106:28000/activities/inscription", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken'),
         },
         body: JSON.stringify({
            id_user: user_id,
            id_activities: activity_id,
         }),
      });
      return await response.json();
   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}