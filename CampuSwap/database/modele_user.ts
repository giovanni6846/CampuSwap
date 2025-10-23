import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

export default class User extends Model {
    static table = "users";

    @field("id") idm!: string;
    @field("username") username!: string;
    @field("email") email!: string;
    @field("activities") activities!: string;
}
