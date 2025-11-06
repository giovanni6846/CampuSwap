import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('local.db');

export const delete_all = () => {
   try {
      db.runSync('DELETE FROM activities ;');
   } catch (error) {
      console.error('❌ Erreur lors de la lecture SQLite :', error);
   }
};
