import AsyncStorage from '@react-native-async-storage/async-storage';

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
         await AsyncStorage.setItem('authToken', data.token);
         await AsyncStorage.setItem('user_id', data.user_Id);
      }

      return data;

   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}