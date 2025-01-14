import { vi } from 'vitest';
import axios from 'axios';

export const mockNavigate = vi.fn();
export const mockedAxios = axios as jest.Mocked<typeof axios>;

export const mockReactRouter = () => {
  vi.mock('react-router-dom', async (importOriginal) => {
    const actual =
      (await importOriginal()) as typeof import('react-router-dom');
    return {
      ...actual,
      useNavigate: () => mockNavigate,
    };
  });
};

export const mockI18n = () => {
  vi.mock('react-i18next', async () => {
    const actual = await vi.importActual('react-i18next');
    return {
      ...actual,
      useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
          changeLanguage: vi.fn(),
        },
      }),
    };
  });
};

// Call this in each test file to initialize the mocks
export const initializeMocks = () => {
  mockReactRouter();
  vi.mock('axios');
};
