// Skip Husky install in production and CI environments
if (process.env.NODE_ENV === 'production' || process.env.CI) {
  process.exit(0)
}