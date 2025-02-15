import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  session: mongoose.Types.ObjectId;
  summary: string;
  description: string;
  start: Date;
  end: Date;
}

const EventSchema: Schema = new Schema({
  session: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  summary: { type: String, required: true },
  description: { type: String, required: false },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model<IEvent>('Event', EventSchema);