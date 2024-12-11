import { Schema, model, Document } from 'mongoose';

interface IFeedback extends Document {
  sessionId: string;
  userId: string;
  rating: number;
  comment: string;
}

const feedbackSchema = new Schema<IFeedback>(
  {
    sessionId: { type: Schema.Types.ObjectId, ref: 'Session', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 200 },
  },
  { timestamps: true }
);

const Feedback = model<IFeedback>('Feedback', feedbackSchema);

export default Feedback;
