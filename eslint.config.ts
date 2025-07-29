import js from '@eslint/js';
import globals from 'globals';
import ts from 'typescript-eslint';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import json from '@eslint/json';
import pluginRouter from '@tanstack/eslint-plugin-router'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'], 
  jsxA11y.flatConfigs.recommended,
  ...pluginRouter.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2025 },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off', // innecesario con TS
    },
  },
  {
    files: ['**/*.{json,jsonc,json5}'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended' as never],
  }
);
