import { Document, model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  profilePicture: string; // Neues Feld
  generateAuthToken: (secret: string) => string;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profilePicture: { type: String, default: '' }, // Neues Feld
});

userSchema.methods.generateAuthToken = function (secret: string) {
  return jwt.sign({ userId: this._id }, secret, { expiresIn: '1h' });
};

const User = model<IUser>('User', userSchema);

export default User;
