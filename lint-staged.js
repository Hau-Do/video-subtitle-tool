module.exports = {
  '**/*.{js,jsx,ts,tsx}': ['eslint', () => 'tsc-files --noEmit'],
  'src/**/*.{js,jsx,ts,tsx}': [
    (files) => {
      const coverageCollects = files.reduce(
        (accmu, item) => (accmu += `--collectCoverageFrom=${item.replace(`${__dirname}/`, '')} `),
        ''
      );
      return `cross-env CI=true jest --watchAll=false --bail --coverage ${coverageCollects} `;
    },
  ],
  '*.{js,jsx,ts,tsx,json,css,js}': ['prettier --write'],
};
