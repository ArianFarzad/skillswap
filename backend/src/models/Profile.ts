import { Schema, model, Document, ValidatorProps, Types } from 'mongoose';

interface IProfile extends Document {
  userId: Types.ObjectId;
  name: string;
  skills: string[];
  interests: string[];
  points: number; // Neues Feld für Punkte
}

const profileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  skills: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return v.every((skill) => skill.length <= 50);
      },
      message: (props: ValidatorProps) =>
        `${props.value} exceeds the maximum allowed length (50)`,
    },
  },
  interests: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return v.every((interest) => interest.length <= 50);
      },
      message: (props: ValidatorProps) =>
        `${props.value} exceeds the maximum allowed length (50)`,
    },
  },
  points: { type: Number, default: 0 }, // Neues Feld für Punkte
});

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;