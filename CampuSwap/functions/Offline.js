import AsyncStorage from '@react-native-async-storage/async-storage';
import { initDatabase, syncActivities } from '../database/database';

export const maj_offline = async () => {

      const data = await AsyncStorage.getItem("unsubscribe");
      const list= data ? JSON.parse(data) : [];

      if (list.length === 0) {
         console.log("✅ Aucune désinscription à synchroniser");
         return;
      }

      console.log(`🔁 Synchronisation de ${list.length} désinscriptions...`);

      const token = await AsyncStorage.getItem("authToken");
      const userId = await AsyncStorage.getItem("user_id");

      for (const id_activity of list) {
         const response = await fetch(`http://10.6.0.7:28000/activities/desinscription`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({
               id_user: userId,
               id_activities: id_activity,
            }),
         });

         if (response.ok) {
            console.log(`✅ Désinscription réussie pour ${id_activity}`);
         } else {
            console.warn(`⚠️ Échec désinscription ${id_activity}: ${response.status}`);
         }
      }

      await AsyncStorage.removeItem("unsubscribe");

      /*Activité à supprimer*/
       const data2 = await AsyncStorage.getItem("delete");
       const list2= data2 ? JSON.parse(data2) : [];

      if (list2.length === 0) {
         console.log("✅ Aucune désinscription à synchroniser");
         return;
      }

      console.log(`🔁 Synchronisation de ${list2.length} désinscriptions...`);

      const token2 = await AsyncStorage.getItem("authToken");
      const userId2 = await AsyncStorage.getItem("user_id");

      for (const id_activity of list2) {
         const response = await fetch(`http://10.6.0.7:28000/activities/desinscription`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${token2}`,
            },
            body: JSON.stringify({
               id_user: userId2,
               id_activities: id_activity,
            }),
         });

         if (response.ok) {
            console.log(`✅ Désinscription réussie pour ${id_activity}`);
         } else {
            console.warn(`⚠️ Échec désinscription ${id_activity}: ${response.status}`);
         }
      }

      await AsyncStorage.removeItem("delete");
};