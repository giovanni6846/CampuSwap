import AsyncStorage from '@react-native-async-storage/async-storage';

export async function All_activities(){
   try {
      const response = await fetch("http://10.6.0.7:28000/activities/findAll", {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken'),
         },
          mode: "cors",
      });
      return await response.json();
   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}