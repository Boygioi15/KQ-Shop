import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({collection: 'reviews'})
export class Review extends Document {
  @Prop({ required: true, min: 1, max: 5, type: Number, validate: Number.isInteger })
  rating: number;

  @Prop({ required: true, type: String, validate: (value: string) => value.trim().length > 0 })
  comment: string;

  @Prop([{ 
    type: {
      url: { type: String, required: true },
      public_ID: { type: String, required: true }
    }
  }])
  files: { url: string; public_ID: string }[];

  @Prop({ 
    type: {
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now }
    }
  })
  adminResponse: { content: string; createdAt: Date };

  @Prop({ type: Types.ObjectId, required: true })
  productRef: Types.ObjectId;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;
}

@Schema({collection: 'review_reports'})
export class Review_Report extends Document{
  @Prop({required: true, ref: 'reviews'})
  reviewRef: Types.ObjectId;

  @Prop({required: true, ref: "users"})
  userRef: Types.ObjectId;

  @Prop({required: true, validate: (value: string) => value.trim().length > 0})
  reason: string;
}

@Schema({collection: 'review_likes'})
export class Review_Like extends Document{
  @Prop({required: true, ref: 'reviews'})
  reviewRef: Types.ObjectId;

  @Prop({required: true, ref: "users"})
  userRef: Types.ObjectId;
}
export const ReviewSchema = SchemaFactory.createForClass(Review);
export const ReviewReportSchema = SchemaFactory.createForClass(Review_Report);
export const ReviewLikeSchema = SchemaFactory.createForClass(Review_Like);