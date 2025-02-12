import React from 'react';

export const calculatePoints = (messagesCount: number) => {
  return Math.floor(messagesCount / 10);
};

export const handleInputFieldChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  setter: React.Dispatch<React.SetStateAction<string>>,
  maxLength: number
) => {
  const { value } = event.target;
  if (value.length <= maxLength) {
    setter(value);
  }
};

export const cleanParams = (
  params: Record<string, any>
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(params).filter(
      ([_, value]) =>
        value !== undefined && // Remove undefined
        value !== null && // Remove null
        !(typeof value === 'string' && value.trim() === '') // Remove empty or whitespace-only strings
    )
  );
};
