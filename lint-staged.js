module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'eslint',
    'jest --bail --watchAll=false --findRelatedTests --passWithNoTests --coverage',
    () => 'tsc-files --noEmit',
  ],
  '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
};
