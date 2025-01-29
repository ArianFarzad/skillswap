import { NavigateFunction } from 'react-router-dom';

export const redirectToLogin = (
  navigate: NavigateFunction,
  currentPath: string
) => {
  navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
};
