import AsyncStorage from '@react-native-async-storage/async-storage';

export async function create_user(email, password, username){
   try {
       const response = await fetch("http://10.205.124.106:28000/login/inscription", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            email: email,
            password: password,
            username: username,
         }),
      });

       return response.json();
   } catch (error) {
      console.error("Erreur lors de la requête :", error);
   }
}