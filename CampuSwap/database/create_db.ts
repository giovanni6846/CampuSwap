import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import User from "./modele_user";
import Activities from "./modele_activities";
import {campusSwap} from "./schemas_bdd";

const adapter = new SQLiteAdapter({
    schema: campusSwap,
});

export const database = new Database({
    adapter,
    modelClasses: [User, Activities],
});
