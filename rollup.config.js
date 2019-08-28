/* @flow strict */

import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'

const pkg = require('./package.json')

export default [
  {
    input: 'src/index.js',
    plugins: [builtins(), resolve(), commonjs()],
    output: {
      file: pkg['main'],
      format: 'umd',
      name: 'WDElements'
    }
  },
  {
    input: 'src/index.js',
    external: ['wikidata-sdk', 'querystring'],
    globals: {
      'wikidata-sdk': 'wdk',
      querystring: 'querystring'
    },
    output: {
      file: pkg['module'],
      format: 'es'
    }
  }
]
