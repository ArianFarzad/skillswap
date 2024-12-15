import axios from 'axios';

const API_URL = 'http://localhost:8000/api/gamification';

export const getPoints = async (userId: string, token: string) => {
  const response = await axios.get(`${API_URL}/points`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { userId },
  });
  return response.data;
};

export const addPoints = async (userId: string, points: number) => {
  const response = await axios.put(`${API_URL}/points`, {
    userId,
    points,
  });
  return response.data;
};
