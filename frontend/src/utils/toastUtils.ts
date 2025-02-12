import toast, { ToastOptions } from 'react-hot-toast';
import {
  isValidTranslationKey,
  TranslationFunction,
} from './translationUtils.ts';

/**
 * Displays a toast message based on an API response.
 * If the message key exists in the translation keys, it displays the corresponding message.
 * Otherwise, it falls back to a generic error message.
 * @param type - The type of the toast message.
 * @param message - The error message or object.
 * @param t - The translation function.
 * @param options - The toast options.
 */

interface ExtendedToastOptions extends ToastOptions {
  params?: Record<string, string>;
  points?: string;
}

export const showToast = (
  type: 'error' | 'success',
  message: unknown,
  t: TranslationFunction,
  options?: ExtendedToastOptions
) => {
  const toastConfig: ToastOptions = {
    duration: 5000,
    position: 'bottom-right',
    ...options,
  };

  let toastMessage: string;

  if (typeof message === 'string' && isValidTranslationKey(message)) {
    toastMessage = t(message, options?.params);
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
