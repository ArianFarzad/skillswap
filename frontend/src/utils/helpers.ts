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
