module.exports = {
  '**/*.{js,jsx,ts,tsx}': [
    'react-scripts test --bail --watchAll=false --findRelatedTests --passWithNoTests --coverage',
    () => 'tsc-files --noEmit'
  ],
  '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write']
}
