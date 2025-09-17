import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
   @Prop({ required: true })
   username!: string;

   @Prop({ required: true })
   password?: string;

   @Prop({ unique: true, required: true })
   email!: string;

   @Prop({ required: true })
   isAdmin!: boolean;

   @Prop({ required: true })
   isBlock!: boolean;

   @Prop({ required: true })
   activities!: string[];

   @Prop({ required: true })
   IsValidate!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
