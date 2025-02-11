export const isValidSkillOrInterest = (entry: string): boolean => {
  if (!entry) {
    return false;
  }
  const trimmed = entry.trim();
  if (trimmed.length === 0 || trimmed.length > 64) {
    return false;
  }

  // Regex allows letters, numbers, spaces, and specific special characters
  const regex = /^[a-zA-Z0-9@#$%&*!:+._-]+(?:\s[a-zA-Z0-9@#$%&*!:+._-]+)*$/;

  return regex.test(trimmed);
};

export const hasDuplicates = (array: string[] | undefined, newEntry: string): boolean => {
  if (!array) {
    return false;
  }
  return array.some((entry) => entry.toLowerCase() === newEntry.toLowerCase());
};
