/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTests.ts',
    coverage: {
      reporter: ['text', 'lcov', 'html', 'coverage-svg'],
      reportsDirectory: './coverage',
    },
  },
});
