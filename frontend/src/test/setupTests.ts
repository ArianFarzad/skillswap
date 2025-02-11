import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

globalThis.Element.prototype.scrollIntoView = vi.fn();
