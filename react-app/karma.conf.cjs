// PROBADO EN BRAVE
if (process.platform === 'win32') {
    process.env.CHROME_BIN = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    
    // Archivos a evaluar (basicamente los tests, codigo, etc)
    files: [
      { pattern: 'src/**/*.js', type: 'module', included: false },
      { pattern: 'tests/**/*.spec.js', type: 'module', included: true }
    ],

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    
    // Aunque se usa ChromeHeadless, es personalizado porque tengo Brave, en el README se encontraran para otros navegadores
    browsers: ['BraveHeadless'],
    customLaunchers: {
      BraveHeadless: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
    
    singleRun: true,
    concurrency: Infinity
  });
};