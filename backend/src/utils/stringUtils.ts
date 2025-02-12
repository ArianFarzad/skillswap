export const isNotBlank = (value: string) => {
  return value !== undefined && value !== null && value.trim() !== '';
};
