export const isNotBlank = (value: string | undefined) => {
  return value !== undefined && value !== null && value.trim() !== '';
};

export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).length;
};
