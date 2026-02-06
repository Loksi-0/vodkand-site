import js from '@eslint/js'
import globals from 'globals'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import preferArrowFunctions from 'eslint-plugin-prefer-arrow-functions'
import prettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist', 'eslint.config.js']
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: {
      prettier,
      '@typescript-eslint': tsPlugin,
      'prefer-arrow-functions': preferArrowFunctions
    },
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...tsPlugin.configs['strict-type-checked'].rules,

      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleAttributePerLine: true,
          arrowParens: 'always'
        }
      ],

      'prefer-arrow-functions/prefer-arrow-functions': [
        'error',
        {
          allowedNames: [],
          allowNamedFunctions: false,
          allowObjectProperties: false,
          classPropertiesAllowed: true,
          disallowPrototype: false,
          returnStyle: 'unchanged',
          singleReturnOnly: false,
        },
      ],

      'no-non-null-assertion': 'off',

      'no-console': 'off',
      eqeqeq: 'warn',
      curly: 'warn',
      'no-undef': 'off',
      'no-else-return': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
    }
  }
])
