import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Test(){


   try {
      const response = await fetch('http://10.6.0.7:28000/status', {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      });
       console.log(">>> DEBUT FETCH");

      await AsyncStorage.setItem('connected', 'false');
      if (response.ok) {
         const data = await response.json();
          console.log(">>> DATA:", data);
         await AsyncStorage.setItem('connected', 'true');
         return { ok: true, status: 'success', data };
      } else {
         await AsyncStorage.setItem('connected', 'false');
         return { ok: false, status: 'api_error', message: `Erreur API ${response.status}` };
      }

   } catch (error) {
       console.log(">>> FETCH ERROR:", error);
      await AsyncStorage.setItem('connected', 'false');
      return { ok: false, status: 'unreachable', message: "Serveur non joignable, veuillez réessayer plus tard." };

   }
}