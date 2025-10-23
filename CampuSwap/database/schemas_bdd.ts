// schema.ts
import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const campusSwap = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: "users",
            columns: [
                { name: "id", type: "string" },
                { name: "username", type: "string" },
                { name: "email", type: "number" },
                { name: "activities", type: "string"},
            ],
        }),
        tableSchema({
            name: "activities",
            columns: [
                { name: "idm", type: "string" },
                { name: "name", type: "string" },
                { name: "description", type: "string" },
                { name: "user_created", type: "string"},
                { name: "datdeb", type: "number"},
                { name: "datfin", type: "number"},
            ],
        }),
    ],
});
