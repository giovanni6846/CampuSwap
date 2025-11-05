import AsyncStorage from '@react-native-async-storage/async-storage';

export const appendToStorage = async (key: string, id_activities:string) => {
   try {
      const data = await AsyncStorage.getItem(key);
      const list = data ? JSON.parse(data) : [];

      list.push(id_activities);

       AsyncStorage.setItem(key, JSON.stringify(list));

   } catch (error) {
   }
};