
import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  userId: number;
  username: string;
  password: string;
  fullName: { firstName: string; lastName: string };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: { street: string; city: string; country: string };
  orders: { productName: string; price: number; quantity: number }[];
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  userId: { type: Number, unique: true },
  username: { type: String, unique: true },
  password: String,
  fullName: { firstName: String, lastName: String },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: { street: String, city: String, country: String },
  orders: [
    {
      productName: String,
      price: Number,
      quantity: Number,
    },
  ],
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
