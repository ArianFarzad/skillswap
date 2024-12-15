// Datei: backend/src/models/Message.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  sender: string;
  receiver: string;
  content: string;
  timestamp: Date;
}

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IMessage>('Message', MessageSchema);