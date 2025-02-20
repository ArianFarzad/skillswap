export const isNotBlank = (value: string | undefined) => {
  return value !== undefined && value !== null && value.trim() !== '';
};
