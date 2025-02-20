export interface IFeedback {
  userId: {
    name: string;
  };
  rating: number;
  feedback: string;
}

export interface IMessage {
  sender: {
    _id: string; // Use string to represent ObjectId in the frontend
    name: string; // Include `name` since it's used in the UI
  };
  content: string;
  timestamp: string; // Use string because dates are usually serialized as strings in JSON
}

export interface IProfile {
  name: string;
  skills: string[];
  interests: string[];
  points: number;
  userId: string;
  profilePicture: string | undefined;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
}
