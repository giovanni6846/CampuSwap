import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('local.db');


export const initDatabase = () => {
   db.execSync(`
    CREATE TABLE IF NOT EXISTS activities (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT,
      description TEXT,
      datdeb TEXT,
      datfin TEXT,
      user_created TEXT
    );
  `);
};

export const syncActivities = (remoteActivities: any[]) => {
   if (!Array.isArray(remoteActivities)) {
      console.error('❌ syncActivities: les données reçues ne sont pas un tableau');
      return;
   }

   // ✅ on précise le type des lignes
   const localRows = db.getAllSync('SELECT id FROM activities;') as { id: string }[];
   const localIds = new Set(localRows.map(r => r.id));
   const remoteIds = new Set(remoteActivities.map(a => a._id));

   db.withTransactionSync(() => {
      // 🔄 Création / Mise à jour
      for (const item of remoteActivities) {
         if (localIds.has(item._id)) {
            db.runSync(
               `UPDATE activities
           SET name=?, description=?, datdeb=?, datfin=?, user_created=?
           WHERE id=?;`,
               [item.name, item.description, item.datdeb, item.datfin, item.user_created, item._id]
            );
         } else {
            db.runSync(
               `INSERT INTO activities (id, name, description, datdeb, datfin, user_created)
           VALUES (?, ?, ?, ?, ?, ?);`,
               [item._id, item.name, item.description, item.datdeb, item.datfin, item.user_created]
            );
         }
      }

      // ❌ Suppression des absents
      for (const row of localRows) {
         if (!remoteIds.has(row.id)) {
            db.runSync('DELETE FROM activities WHERE id=?;', [row.id]);
         }
      }
   });

   console.log('✅ Synchronisation complète terminée');
};