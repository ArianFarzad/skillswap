import { Schema, model, Document } from 'mongoose';

interface ISession extends Document {
  tutor: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  datetime: Date;
  status: string;
}

const SessionSchema = new Schema<ISession>({
  tutor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  datetime: { type: Date, required: true },
  status: { type: String, required: true },
});

const Session = model<ISession>('Session', SessionSchema);

export default Session;