import { Schema, model } from 'mongoose';

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  skills: [{ type: String, maxlength: 50 }],
  interests: [{ type: String, maxlength: 50 }],
});

const Profile = model('Profile', profileSchema);

export default Profile;