import { NavigateFunction } from 'react-router-dom';

export const redirectToLogin = (
  navigate: NavigateFunction,
  currentPath: string
) => {
  void navigate(`/login?redirect=${encodeURIComponent(currentPath)}`);
};
