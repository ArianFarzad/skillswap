import '@testing-library/jest-dom';
import { vi } from 'vitest';
globalThis.Element.prototype.scrollIntoView = vi.fn();
