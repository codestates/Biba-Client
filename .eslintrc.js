export const parser = '@typescript-eslint/parser';
export const extends = [
  'plugin:react/recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:prettier/recommended',
];
export const parserOptions = {
  project: ['tsconfig.json', '@typescript-eslint/parser'],
  ecmaVersion: 2020,
  sourceType: 'module',
  ecmaFeatures: {
    jsx: true,
  },
};
export const env = {
  es6: true,
};
export const plugins = [
  '@typescript-eslint',
  'react',
  'react-hooks',
  'eslint-plugin-import',
  'prettier',
];
export const rules = {
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      trailingComma: 'all',
    },
  ],
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  'react/jsx-filename-extension': [
    'warn',
    {
      extensions: ['.jsx', '.tsx'],
    },
  ],
  'react/prop-types': [
    1,
    {
      ignore: ['context', 'tracking'],
    },
  ],
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'warn',
};
export const settings = {
  react: {
    version: 'detect',
  },
};
export const overrides = [
  {
    files: ['*.ts', '*.tsx'],
    rules: {
      'react/prop-types': 'off',
    },
  },
];
