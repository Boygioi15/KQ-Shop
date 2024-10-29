import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './constanst'

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ require: true }) 
  name: string;

  @Prop({ unique: true, required: true }) 
  email: string;
  
  @Prop({ required: true }) 
  password: string;

  @Prop({ require: true }) 
  phone: string;
  
  @Prop() 
  image: string;

  @Prop({ default: Role.User, enum: [Role.Admin, Role.User] }) 
  role: string;

  @Prop({ default: false }) 
  isSeller: boolean;

  @Prop()
  address: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
