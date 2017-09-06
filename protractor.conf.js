// conf.js
exports.config = {
  framework: 'jasmine',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
    'src/**/*.e2e.js'
  ],
  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
}