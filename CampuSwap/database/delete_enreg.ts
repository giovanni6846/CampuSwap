import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('local.db');

export const delete_enreg = (id: string) => {
   try {
      db.runSync('DELETE FROM activities WHERE activities.id = ?;', [id]);
   } catch (error) {
      console.error('❌ Erreur lors de la lecture SQLite :', error);
   }
};
