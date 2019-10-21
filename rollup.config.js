/* @flow strict */

import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

const pkg = require('./package.json')

export default [
  {
    input: 'src/index.js',
    plugins: [ builtins(), resolve(), commonjs()],
    output: {
      file: pkg['main'],
      format: 'umd',
      name: 'WDElements'
    }
  },
  {
    input: 'src/index.js',
    external: ['wikibase-sdk', 'dataloader', 'querystring', 'setimmediate'],
    globals: {
      'wikibase-sdk': 'wikibase-sdk',
      querystring: 'querystring',
      dataloader: 'dataloader',
      setimmediate: 'setimmediate',
    },
    output: {
      file: pkg['module'],
      format: 'es'
    }
  }
]
