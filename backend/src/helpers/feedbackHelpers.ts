import Feedback, { IFeedback } from '../models/Feedback';

interface PopulatedFeedback extends Omit<IFeedback, 'userId'> {
  userId: { _id: string; name: string };
}

// Helper to get feedback details for a single session, split by the sender and receiver
export async function getSessionFeedbackStats(
  sessionId: string,
  loggedInUserId: string
): Promise<{
  givenFeedbacks: PopulatedFeedback[];
  averageRatingGiven: number | null;
  receivedFeedbacks: PopulatedFeedback[];
  averageRatingReceived: number | null;
}> {
  // Fetch all feedbacks for this session and populate the user's name
  const feedbacks = (await Feedback.find({ sessionId }).populate(
    'userId',
    '_id name'
  )) as unknown as PopulatedFeedback[];

  // Separate feedbacks based on who submitted them
  const givenFeedbacks = feedbacks.filter(
    (fb) => fb.userId._id.toString() === loggedInUserId
  );
  const receivedFeedbacks = feedbacks.filter(
    (fb) => fb.userId._id.toString() !== loggedInUserId
  );

  // Calculate averages for each group; if no feedback exists, return null
  function getAverageRatingForArray(array: PopulatedFeedback[]) {
    return array.length > 0
      ? array.reduce((sum, fb) => sum + fb.rating, 0) / array.length
      : null;
  }

  const averageRatingGiven = getAverageRatingForArray(givenFeedbacks);
  const averageRatingReceived = getAverageRatingForArray(receivedFeedbacks);

  return {
    givenFeedbacks,
    averageRatingGiven,
    receivedFeedbacks,
    averageRatingReceived,
  };
}
