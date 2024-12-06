import { Schema, model, Document } from 'mongoose';
import jwt from 'jsonwebtoken';

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
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return token;
};

const User = model<IUser>('User', userSchema);

export default User;