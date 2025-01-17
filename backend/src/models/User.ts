import { Document, model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import { env } from '../config/config';

interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  generateAuthToken: () => string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ userId: this._id }, env.JWT_SECRET!, {
    expiresIn: '1h',
  });
};

const User = model<IUser>('User', userSchema);

export default User;
