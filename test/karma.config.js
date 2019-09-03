module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],
    files: [
      '../node_modules/@pollyjs/core/dist/umd/pollyjs-core.js',
      '../node_modules/@pollyjs/adapter-fetch/dist/umd/pollyjs-adapter-fetch.js',
      '../node_modules/@pollyjs/persister-rest/dist/umd/pollyjs-persister-rest.js',
      '../dist/wd-elements.umd.js',
      'test.js'
    ],
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  })
}
