import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class Activities extends Model {
    static table = "activities";

    @field("id") idm!: string;
    @field("name") name!: string;
    @field("description") description!: string;
    @field("user_created") user_created!: string;
    @field("datdeb") datdeb!: Date;
    @field("datfin") datfin!: Date;
}
