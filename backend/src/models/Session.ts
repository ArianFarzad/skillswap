import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  sender: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

export interface ISession extends Document {
  tutor: mongoose.Types.ObjectId;
  student: mongoose.Types.ObjectId;
  date: Date;
  status: string;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const SessionSchema: Schema = new Schema({
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  status: { type: String, default: 'pending' },
  messages: { type: [MessageSchema], default: [] },
});

export default mongoose.model<ISession>('Session', SessionSchema);
