const config = {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,scss,sass,less}": ["eslint --fix", "prettier --write"],
  "*.{md,mdx}": ["eslint --fix", "prettier --write"],
  "*.{json,yaml,yml}": ["eslint --fix", "prettier --write"],
};

export default config;
