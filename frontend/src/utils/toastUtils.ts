import toast, { ToastOptions } from 'react-hot-toast';
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
    const errorKey = axiosError.response?.data?.error || 'error.server_error';

    if (isValidTranslationKey(errorKey)) {
      const errorMessage = t(errorKey);
      toast.error(errorMessage);
    } else {
      toast.error(t('error.server_error'));
    }
  } else {
    toast.error(t('error.server_error'));
  }
};

export const showToast = (
  type: 'error' | 'success' | 'info' | 'warning',
  message: unknown,
  t: TranslationFunction,
  options?: ToastOptions
) => {
  const toastConfig: ToastOptions = {
    duration: 5000,
    position: 'bottom-right',
    ...options,
  };

  let toastMessage: string;

  if (typeof message === 'string' && isValidTranslationKey(message)) {
    toastMessage = t(message);
  } else if (typeof message === 'object' && message !== null) {
    const error = message as { response?: { data?: { error?: string } } };
    const errorKey = error.response?.data?.error || 'error.server_error';
    toastMessage = isValidTranslationKey(errorKey)
      ? t(errorKey)
      : t('error.server_error');
  } else {
    toastMessage = t('error.server_error');
  }

  switch (type) {
    case 'error':
      toast.error(toastMessage, {
        ...toastConfig,
        style: {
          background: '#ffebee',
          color: '#c62828',
        },
      });
      break;
    case 'success':
      toast.success(toastMessage, {
        ...toastConfig,
        style: {
          background: '#e8f5e9',
          color: '#2e7d32',
        },
      });
      break;
    default:
      toast(toastMessage, toastConfig);
  }
};
