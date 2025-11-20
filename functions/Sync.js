import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase, syncActivities } from '../database/database';

export async function Sync(){
   try {
      const response = await fetch(`http://10.6.0.7:28000/sync/pull?id_user=${await AsyncStorage.getItem('user_id')}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken')
         },
          mode: "cors",
      });

      initDatabase();
      await syncActivities(await response.json());

   } catch (error) {

      console.error("Erreur lors de la requête :", error);
   }
}