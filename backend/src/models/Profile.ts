import { Schema, model, Document, ValidatorProps } from 'mongoose';

interface IProfile extends Document {
  userId: string;
  name: string;
  skills: string[];
  interests: string[];
}

const profileSchema = new Schema<IProfile>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  skills: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return v.every(skill => skill.length <= 50);
      },
      message: (props: ValidatorProps) => `${props.value} exceeds the maximum allowed length (50)`
    }
  },
  interests: {
    type: [String],
    validate: {
      validator: function (v: string[]) {
        return v.every(interest => interest.length <= 50);
      },
      message: (props: ValidatorProps) => `${props.value} exceeds the maximum allowed length (50)`
    }
  }
});

const Profile = model<IProfile>('Profile', profileSchema);

export default Profile;