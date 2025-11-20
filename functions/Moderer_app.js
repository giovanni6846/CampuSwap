import AsyncStorage from '@react-native-async-storage/async-storage';

export async function moderation(user_id, activity_id, motif, isBan){
   try {
      const response = await fetch("http://10.6.0.7:28000/activities/moderation", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken'),
         },
         body: JSON.stringify({
            id_user: user_id,
            id_activities: activity_id,
            motif: motif,
            moderation: isBan,
         }),
          mode: "cors",
      });
      return await response.json();
   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}