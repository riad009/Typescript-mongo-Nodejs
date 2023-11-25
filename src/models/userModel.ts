

import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

const orderSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const userSchema = new Schema({
  userId: { type: Number, unique: true, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  orders: [orderSchema],
});

export interface UserDocument extends Document {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders: Array<{
    productName: string;
    price: number;
    quantity: number;
  }>;
}

const User = mongoose.model<UserDocument>('User', userSchema);

export const createUserSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string(),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  orders: z.array(
    z.object({
      productName: z.string(),
      price: z.number(),
      quantity: z.number(),
    })
  ),
});

export default User;



