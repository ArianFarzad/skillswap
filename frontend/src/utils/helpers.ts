export const calculatePoints = (messagesCount: number) => {
  return Math.floor(messagesCount / 10);
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
