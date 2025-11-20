import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase, syncActivities } from '../database/database';

export async function unsubscribe_act(id) {
   try {
       await fetch(`http://10.6.0.7:28000/activities/desinscription`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken')
         },
         body: JSON.stringify({
            id_user: await AsyncStorage.getItem('user_id'),
            id_activities: id,
         }),
           mode: "cors",
      });

     return true

   } catch (error) {

      console.error("Erreur lors de la requête :", error);
   }
}