// eslint.config.mjs
// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**', 'coverage/**', 'tsconfig.build.json', 'tsconfig.eslint.json'],
  },

  eslint.configs.recommended,

  {
    ...tseslint.configs.recommendedTypeChecked,
    files: ['src/**/*.ts', 'apps/**/*.ts', 'libs/**/*.ts'],
    languageOptions: {
      parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
        'no-unused-vars': 'off',
        "no-redeclare": ["error", { "builtinGlobals": false }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {   argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            ignoreRestSiblings: true,},
      ],
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  eslintPluginPrettierRecommended,
];
