const CracoAlias = require('craco-alias')
const CracoAntDesignPlugin = require('craco-antd')

const fs = require('fs')
const path = require('path')

const rawVar = fs.readFileSync(path.join(__dirname, 'src/theme/vars.scss'), 'utf8')

const vars = rawVar
  .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '')
  .split('\n')
  .filter((line) => line.length > 0)
  .map((line) => line.split(': '))
  .map(([key, value]) => ({
    key: key.replace('$', '@'),
    value: value.replace(';', '')
  }))
  .reduce((obj, { key, value }) => ({ ...obj, [key]: value }), {})
console.log('varsss', vars)
module.exports = {
  cache: false,
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './',
        tsConfigPath: './tsconfig.paths.json'
      }
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: vars
      }
    }
  ]
}
