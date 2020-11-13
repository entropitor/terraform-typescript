module.exports = {
  extends: ['@datacamp/eslint-config/typescript'],
  overrides: [
    {
      files: ['**/src/generated/**/*.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-use-before-define': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
      },
    ],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'sonarjs/prefer-immediate-return': 'off',
  },
};
