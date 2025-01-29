import toast from 'react-hot-toast';
import {
  defaultTranslation,
  isValidTranslationKey,
  TranslationFunction,
} from './translationUtils.ts';

/**
 * Displays a toast error message based on an API response error.
 * If the error key exists in the translation keys, it displays the corresponding message.
 * Otherwise, it falls back to a generic error message.
 *
 * @param error - The error object, typically from an API response.
 * @param t - The typed translation function.
 */
export const showToastError = (
  error: unknown,
  t: TranslationFunction = defaultTranslation
) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { error?: string } } };
    const errorKey =
      axiosError.response?.data?.error || 'error.unexpected_error';

    if (isValidTranslationKey(errorKey)) {
      const errorMessage = t(errorKey);
      toast.error(errorMessage);
    } else {
      toast.error(t('unexpected_error'));
    }
  } else {
    toast.error(t('unexpected_error'));
  }
};

export const showErrorMessage = (
  message: string,
  t: TranslationFunction = defaultTranslation
) => {
  if (isValidTranslationKey(message)) {
    toast.error(t(message));
  } else {
    toast.error(message);
  }
};
