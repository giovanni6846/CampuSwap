import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ActivitiesDocument = HydratedDocument<Activities>;

@Schema()
export class Activities {
   @Prop({ required: true })
   name!: string;

   @Prop({ required: true })
   description!: string;

   @Prop({ Type: Types.ObjectId, required: true })
   user_created!: Types.ObjectId;

   @Prop({ required: true })
   datdeb!: Date;

   @Prop({ required: true })
   datfin!: Date;

   @Prop({ required: true })
   seat!: number;
}

export const ActivitiesSchema = SchemaFactory.createForClass(Activities);
