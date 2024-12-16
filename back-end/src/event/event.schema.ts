import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId, Types } from 'mongoose';

export type EventDocument = Event & Document;

@Schema()
export class Event {
    @Prop()
    description: string;
}
export const EventSchema = SchemaFactory.createForClass(Event);
