import { vi } from 'vitest';

vi.mock('../../utils/axiosInstance', async () => {
  const actual = await vi.importActual('../../utils/axiosInstance');
  return {
    ...actual,
    default: {
      post: vi.fn(),
      get: vi.fn(),
    },
  };
});

vi.mock('react-hot-toast', async (importOriginal) => {
  const actual = (await importOriginal()) as {
    default: { success: () => void; error: () => void };
  };
  return {
    ...actual,
    default: {
      ...actual.default,
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()),
  };
});

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

vi.mock('../../utils/toastUtils', () => {
  return {
    showToastError: vi.fn(),
    showErrorMessage: vi.fn(),
    showToast: vi.fn(),
  };
});

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(global, 'localStorage', { value: localStorageMock });
