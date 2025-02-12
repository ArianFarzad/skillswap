import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  // ✅ Base ESLint rules for all JS/TS files
  js.configs.recommended,
  { ignores: ['node_modules', 'build', 'dist'] },
  // ✅ TypeScript ESLint rules (recommended + requiring type checking)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // ✅ Ensures type-aware linting
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-floating-promises': 'warn', // ✅ Catches unhandled async calls
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // ✅ Ignore unused function parameters starting with "_"
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true, // ✅ Ignore unused rest siblings
        },
      ],
    },
  },
];
