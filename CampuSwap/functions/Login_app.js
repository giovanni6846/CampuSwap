import AsyncStorage from '@react-native-async-storage/async-storage';
import { delete_all } from '../database/delete_all';
import { Sync } from './Sync';

export async function login(username, password){
   try {
      const response = await fetch("http://10.205.124.106:28000/login", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: username,
            password: password,
         }),
      });
      const data = await response.json();
      if (!data.error) {
         const storedUserId = await AsyncStorage.getItem("user_id");
         if (data.user_Id !== storedUserId) {
            delete_all()
            await AsyncStorage.removeItem("unsubscribe");
            await AsyncStorage.removeItem("delete");
         }
         await AsyncStorage.setItem('authToken', data.token);
         await AsyncStorage.setItem('user_id', data.user_Id);
         await AsyncStorage.setItem('isAdmin', String(data.isAdmin));
         if (await AsyncStorage.getItem("isAdmin") == "false") {
            await Sync();
         }
      }

      return data;

   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}