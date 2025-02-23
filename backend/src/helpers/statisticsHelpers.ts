import mongoose from 'mongoose';
import Session from '../models/Session';
import Feedback from '../models/Feedback';

export async function getSessionStats(
  userObjectId: mongoose.Types.ObjectId
): Promise<{
  sessionCount: number;
  tutorSessionCount: number;
  studentSessionCount: number;
  sessionIds: mongoose.Types.ObjectId[];
}> {
  const sessionStats = await Session.aggregate([
    {
      $match: {
        $or: [{ tutor: userObjectId }, { student: userObjectId }],
      },
    },
    {
      $group: {
        _id: null,
        sessionIds: { $push: '$_id' },
        sessionCount: { $sum: 1 },
        tutorSessionCount: {
          $sum: {
            $cond: [{ $eq: ['$tutor', userObjectId] }, 1, 0],
          },
        },
        studentSessionCount: {
          $sum: {
            $cond: [{ $eq: ['$student', userObjectId] }, 1, 0],
          },
        },
      },
    },
  ]);

  if (sessionStats.length > 0) {
    return {
      sessionCount: sessionStats[0].sessionCount,
      tutorSessionCount: sessionStats[0].tutorSessionCount,
      studentSessionCount: sessionStats[0].studentSessionCount,
      sessionIds: sessionStats[0].sessionIds,
    };
  } else {
    return {
      sessionCount: 0,
      tutorSessionCount: 0,
      studentSessionCount: 0,
      sessionIds: [],
    };
  }
}

// Helper to aggregate feedback statistics based on session IDs
export async function getFeedbackStats(
  sessionIds: mongoose.Types.ObjectId[],
  userObjectId: mongoose.Types.ObjectId
): Promise<{ feedbackCount: number; averageRating: number }> {
  const feedbackStats = await Feedback.aggregate([
    {
      $match: {
        sessionId: { $in: sessionIds },
        userId: { $ne: userObjectId },
      },
    },
    {
      $group: {
        _id: null,
        feedbackCount: { $sum: 1 },
        totalRating: { $sum: '$rating' },
      },
    },
  ]);

  if (feedbackStats.length > 0) {
    const feedbackCount = feedbackStats[0].feedbackCount;
    return {
      feedbackCount,
      averageRating: feedbackCount
        ? feedbackStats[0].totalRating / feedbackCount
        : 0,
    };
  } else {
    return { feedbackCount: 0, averageRating: 0 };
  }
}

// Helper to aggregate message statistics for the user
export async function getMessageStats(
  userObjectId: mongoose.Types.ObjectId
): Promise<{
  totalMessages: number;
  sentMessages: number;
  receivedMessages: number;
}> {
  const messageStats = await Session.aggregate([
    {
      $match: {
        $or: [{ tutor: userObjectId }, { student: userObjectId }],
      },
    },
    { $unwind: '$messages' },
    {
      $group: {
        _id: null,
        totalMessages: { $sum: 1 },
        sentMessages: {
          $sum: {
            $cond: [{ $eq: ['$messages.sender', userObjectId] }, 1, 0],
          },
        },
        receivedMessages: {
          $sum: {
            $cond: [{ $ne: ['$messages.sender', userObjectId] }, 1, 0],
          },
        },
      },
    },
  ]);

  if (messageStats.length > 0) {
    return {
      totalMessages: messageStats[0].totalMessages,
      sentMessages: messageStats[0].sentMessages,
      receivedMessages: messageStats[0].receivedMessages,
    };
  } else {
    return { totalMessages: 0, sentMessages: 0, receivedMessages: 0 };
  }
}
