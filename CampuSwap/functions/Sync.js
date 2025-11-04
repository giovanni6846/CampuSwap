import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Sync(){
   try {
      console.error(await AsyncStorage.getItem('user_id'))
      const response = await fetch(`http://10.205.124.106:28000/sync/pull?id_user=${await AsyncStorage.getItem('user_id')}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + await AsyncStorage.getItem('authToken')
         },
      });

      const data_api = await response.json();

      /*const activitiesCollection = database.get('activities');

      await database.write(async () => {
         const localActivities = await activitiesCollection.query().fetch();

         const remoteIds = new Set(data_api.map((a) => a._id));

         for (const item of data_api) {
            const existing = await activitiesCollection
               .query(Q.where('_id', item._id))
               .fetch();

            if (existing.length === 0) {
               await activitiesCollection.create((activity) => {
                  activity.idm = item._id;
                  activity.name = item.name;
                  activity.description = item.description;
                  activity.datdeb = new Date(item.datdeb).getTime();
                  activity.datfin = new Date(item.datfin).getTime();
                  activity.user_created = item.user_created;
               });
            } else {
               await existing[0].update((activity) => {
                  activity.name = item.name;
                  activity.description = item.description;
                  activity.datdeb = new Date(item.datdeb).getTime();
                  activity.datfin = new Date(item.datfin).getTime();
               });
            }
         }

         for (const local of localActivities) {
            if (!remoteIds.has(local._id)) {
               console.log(`🗑️ Suppression de ${local.name}`);
               await local.destroyPermanently();
            }
         }
      });

      console.log('✅ Synchronisation complète terminée');*/
      return true;
   } catch (error) {

      console.error("Erreur lors de la requête :", error);
   }
}