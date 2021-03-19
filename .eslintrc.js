module.exports = {
  extends: ['@datacamp/eslint-config/typescript'],
  overrides: [
    {
      files: ['**/src/generated/**/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'no-shadow': 'off',
        'no-use-before-define': 'off',
        'prefer-type-alias/prefer-type-alias': 'off',
      },
    },
  ],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    camelcase: 'off',
  },
};
