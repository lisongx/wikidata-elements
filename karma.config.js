const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

module.exports = config => {
  config.set(
    merge(createDefaultConfig(config), {
      files: [
        // runs all files ending with .test in the test folder,
        // can be overwritten by passing a --grep flag. examples:
        //
        // npm run test -- --grep test/foo/bar.test.js
        // npm run test -- --grep test/bar/*
        './node_modules/@pollyjs/core/dist/umd/pollyjs-core.js',
        './node_modules/@pollyjs/adapter-fetch/dist/umd/pollyjs-adapter-fetch.js',
        './node_modules/@pollyjs/persister-rest/dist/umd/pollyjs-persister-rest.js',
        './dist/wd-elements.umd.js',
        { pattern: 'test/setup.js',  type: 'module'},
        { pattern: config.grep ? config.grep : 'test/*.test.js', type: 'module' },
      ],

      // By default open-wc run on Chrome, add Firefox here
      browsers: ['FirefoxHeadless'],

      esm: {
        nodeResolve: true,
      },
    }),
  );
  return config;
};
