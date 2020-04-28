module.exports = function(config) {
  config.set({
    frameworks: ["mocha", "chai"],
    files: [
      { pattern: 'test/setup.js', watched: false},
      { pattern: 'test/**/test-*.js', watched: false}
    ],
    preprocessors: {
      // add webpack as preprocessor
      'test/setup.js': ['webpack'],
      'test/**/test-*.js': ['webpack'],
    },
    webpack: {
      // karma watches the test entry points
      // (you don't need to specify the entry option)
      // webpack watches dependencies
      // webpack configuration
    },
    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      stats: 'errors-only',
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['ChromeHeadless', 'FirefoxHeadless'],
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity,
  })
}

