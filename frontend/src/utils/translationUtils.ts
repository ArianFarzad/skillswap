import { useTranslation } from 'react-i18next';
import enTranslations from '../locales/en.json';

// Define the translation function type with flattened keys
export type TranslationFunction = (key: FlattenedKeys) => string;

// Custom hook to provide a typed version of the `t`
export const useTypedTranslation = () => {
  const { t } = useTranslation();
  return {
    t: t as TranslationFunction,
  };
};

type FlattenedKeys = NestedKeys<typeof enTranslations>;

/**
 * Recursively generates all possible dot-notated keys for a given object `T`.
 * This is useful for working with nested objects, such as i18n JSON structures.
 *
 * Example:
 * For the object:
 * {
 *   error: {
 *     email_exists: "Email already exists",
 *     server_error: "Unexpected error",
 *   },
 *   welcome: "Welcome",
 * }
 *
 * The type resolves to:
 * "error.email_exists" | "error.server_error" | "welcome"
 */
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: `${K & string}${T[K] extends object ? `.${NestedKeys<T[K]>}` : ''}`;
    }[keyof T]
  : never;

const extractKeys = (obj: object, prefix = ''): string[] => {
  return Object.entries(obj).flatMap(([key, value]) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    return typeof value === 'object' && value !== null
      ? extractKeys(value, newKey)
      : [newKey];
  });
};

// Precompute all valid translation keys at runtime
const validTranslationKeys = new Set(extractKeys(enTranslations));

/**
 * Validates if a given string is a valid translation key.
 * Uses the type-safe `FlattenedKeys` to ensure correctness.
 */
export const isValidTranslationKey = (key: string): key is FlattenedKeys => {
  return validTranslationKeys.has(key);
};
