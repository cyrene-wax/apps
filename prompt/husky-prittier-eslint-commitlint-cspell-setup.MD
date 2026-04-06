# 🚀 Project Setup Guide

Production-ready TypeScript + ESLint + Prettier + Husky + Commitlint + CSpell

---

## 📦 Requirements

- Node.js >= 14
- npm >= 9
- pnpm >= 9
- Git installed

Check versions:

```bash
node -v
npm -v
pnpm -v
git --version

```

---

# Step 1: Initialize Project

```bash
git init
```

---

# Step 2: Install Required Packages

```bash
npm install --save-dev husky
npm install --save-dev @commitlint/cli
npm install --save-dev @commitlint/config-conventional
npm install --save-dev eslint
npm install --save-dev cspell
npm install --save-dev concurrently
npm install --save-dev @typescript-eslint/eslint-plugin
npm install --save-dev @typescript-eslint/parser
npm install --save-dev eslint-plugin-import
npm install --save-dev eslint-config-prettier
npm install --save-dev eslint-plugin-prettier
npm install --save-dev prettier
npm install --save-dev lint-staged
npm install --save-dev typescript
npm install --save-dev prettier-plugin-tailwindcss
```

or

```bash
pnpm add --save-dev husky @commitlint/cli @commitlint/config-conventional eslint cspell concurrently @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-config-prettier eslint-plugin-prettier prettier lint-staged typescript prettier-plugin-tailwindcss
```

# Step 3: Update package.json Scripts

```json
"lint": "eslint . --ext .ts",
"lint:fix": "pnpm lint --fix",
"format": "prettier --write '**/*.ts{,x}'",
"check:types": "tsc --noEmit",
"check:spell": "git diff --name-only | cspell --no-summary --no-progress --no-must-find-files --file-list stdin",
"check:all": "concurrently \"pnpm lint\" \"pnpm check:types\" \"pnpm check:spell\"",
"pre-commit": "concurrently \"lint-staged --allow-empty\" \"pnpm check:types\" \"pnpm check:spell\"",
"prepare": "husky"
```

# Step 4: Add `lint-staged` config to auto-format files before each commit:

```json
  "lint-staged": {
    "**/*.{ts,js,tsx,jsx}": [
      "prettier --write",
      "eslint --fix",
      "git add"
    ]
  },
```

# Step 5: Configure Husky Git Hooks

`npm`

```bash
npm npx husky or npx husky init
```

`pnpm`

```bash
pnpm husky or pnpm husky init
```

# Step 5: Add git hooks:

### Create two files inside the `.husky/` folder: (pre-commit & commit-msg)

✅ `.husky/pre-commit`

```bash
npx lint-staged
```

✅ `.husky/commit-msg`

```bash
npx commitlint --edit "$1"
```

# Step 6: Eslint Configuration

`npm`

```bash
npx eslint --init
```

`pnpm`

```bash
pnpm eslint --init
```

# Step 7: CSpell Configuration

### Create `cspell.json` file

```json
{
  "version": "0.2",
  "language": "en",
  "words": [],
  "ignorePaths": [
    "./node_modules",
    "./dist",
    "./databases",
    "*.config.js",
    "*.config.ts",
    "*.config.cjs",
    "./package.json",
    "./pnpm-lock.yaml",
    "./docker-compose.yaml",
    "./prisma/schema.prisma",
    "./.cursor"
  ]
}
```

# Step 8: Commitlint Configuration

### Create `commitlint.config.js` file

```js
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'chore', 'docs', 'style', 'refactor', 'test'],
    ],
    'subject-case': [0], // allow any case
    'scope-case': [2, 'always', 'snake-case'],
    'subject-max-length': [2, 'always', 72],
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
  },
};

export default config;
```

# Step 9: Prettier Configuration

### Create `.prettierrc` and `.prettierignore` in the root

`.prettierrc`

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "arrowParens": "always",
  "bracketSpacing": true,
  "semi": true,
  "useTabs": false,
  "trailingComma": "all",
  "singleQuote": true,
  "tabWidth": 2,
  "endOfLine": "lf",
  "printWidth": 80,
  "quoteProps": "consistent",
  "proseWrap": "preserve",
  "embeddedLanguageFormatting": "auto",
  "htmlWhitespaceSensitivity": "strict"
}
```

`.prettierignore`

```json
node_modules/
.next/
coverage/

*-lock.json
*-lock.yaml
*.lock

.env
.env.*
.env-*

**/data/core
**/data/index.ts
**/data/*.gen.ts

```

# Step 10: Package Manager and node version Configuration

### Create `.nvmrc` in the root and paste your used node and pnpm or npm version

```json
v20.11.0
```

### Update `package.json`

```json
  "packageManager": "pnpm@10.26.2"
```

# Step 11: How to Test the Entire Setup

### To verify that Husky, Commitlint, ESLint, Prettier, and Lint-Staged are working correctly, run:

```bash
git add .
git commit -m "feat: setup husky, commitlint, eslint config, lint-staged, and prettier"
```
