import { Schema, model, Document } from 'mongoose';

interface IFeedback extends Document {
  sessionId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  feedback: string;
  rating: number;
}

const FeedbackSchema = new Schema<IFeedback>({
  sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true },
});

const Feedback = model<IFeedback>('Feedback', FeedbackSchema);

export default Feedback;