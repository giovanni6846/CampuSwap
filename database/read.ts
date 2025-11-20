import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('local.db');

export const read = () => {
   try {
      // ✅ Lire toutes les colonnes (pas seulement l'id)
      const localRows = db.getAllSync('SELECT * FROM activities;') as {
         id: string;
         name: string;
         description: string;
         datdeb: string;
         datfin: string;
         user_created: string;
      }[];
      return localRows;
   } catch (error) {
      console.error('❌ Erreur lors de la lecture SQLite :', error);
      return [];
   }
};
