import toast from 'react-hot-toast';
import {
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
export const showToastError = (error: unknown, t: TranslationFunction) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as { response?: { data?: { error?: string } } };
    const errorKey =
      axiosError.response?.data?.error || 'error.unexpected_error';

    if (isValidTranslationKey(errorKey)) {
      const errorMessage = t(errorKey);
      toast.error(errorMessage);
    } else {
      toast.error(t('error.unexpected_error'));
    }
  } else {
    toast.error(t('error.unexpected_error'));
  }
};
