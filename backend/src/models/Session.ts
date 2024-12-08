import { Schema, model, Document } from 'mongoose';

interface ISession extends Document {
  tutor: string;
  student: string;
  date: Date;
  status: string;
}

const sessionSchema = new Schema<ISession>({
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

const Session = model<ISession>('Session', sessionSchema);

export default Session;