export interface IFeedback {
  userId: {
    _id: string;
    name: string;
  };
  rating: number;
  feedback: string;
}

export interface IMessage {
  sender: {
    _id: string;
    name: string;
  };
  content: string;
  timestamp: string; // Use string because dates are usually serialized as strings in JSON
  attachments?: { url: string; type: 'image' | 'pdf' }[];
}

export interface IProfile {
  name: string;
  skills: string[];
  interests: string[];
  points: number;
  userId: string;
  profilePicture: string | undefined;
  aboutMe: string | undefined;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface ISession {
  _id: string;
  tutor: IUser;
  student: IUser;
  date: string;
  status: string;
  messages: IMessage[];
}
