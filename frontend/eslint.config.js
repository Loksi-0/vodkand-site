import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist']
  },
  js.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      prettier
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react/function-component-definition': [
        'error',
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function'
        }
      ],
      'react/display-name': 'error',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'prettier/prettier': [
        'warn',
        {
          endOfLine: 'auto',
          singleAttributePerLine: true,
          arrowParens: 'always'
        }
      ],

      'no-console': 'warn',
      eqeqeq: 'warn',
      curly: 'warn',
      'no-else-return': 'warn',
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }]
    }
  }
])
