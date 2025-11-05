import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Test(){

   const netInfo = await NetInfo.fetch();
   if (!netInfo.isConnected) {
      console.warn("📴 Hors ligne : pas de connexion Internet.");
      return { ok: false, status: 'offline', message: "Vous êtes hors ligne." };
   }

   try {
      const response = await fetch('http://10.205.124.106:28000/status', {
         method: 'GET',
         headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
         const data = await response.json();
         await AsyncStorage.setItem('connected', 'true');
         return { ok: true, status: 'success', data };
      } else {
         await AsyncStorage.setItem('connected', 'false');
         return { ok: false, status: 'api_error', message: `Erreur API ${response.status}` };
      }

   } catch (error) {
      await AsyncStorage.setItem('connected', 'false');
      return { ok: false, status: 'unreachable', message: "Serveur non joignable." };
   }
}