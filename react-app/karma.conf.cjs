// PROBADO EN BRAVE
// Detectar si Brave existe, si no, usar Chrome
const fs = require('fs');
let browserToUse = 'ChromeHeadless';

if (process.platform === 'win32') {
    const bravePath = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';
    if (fs.existsSync(bravePath)) {
        process.env.CHROME_BIN = bravePath;
        browserToUse = 'BraveHeadless';
    }
}

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-coverage',
      'karma-esbuild'
    ],
    
    // Archivos a evaluar
    files: [
      // Archivos fuente para coverage (solo los que tienen tests: validaciones y db)
      { pattern: 'src/utils/validaciones.js', type: 'module', included: false },
      { pattern: 'src/data/db.js', type: 'module', included: false },
      // Tests
      { pattern: 'tests/**/*.spec.js', type: 'module', included: true }
    ],

    // Preprocesadores
    preprocessors: {
      'src/utils/validaciones.js': ['coverage'],
      'src/data/db.js': ['coverage'],
      'tests/**/*.spec.js': ['esbuild']
    },

    // Configuración de esbuild para JSX y resolución de modulos (solo para tests)
    esbuild: {
      jsx: 'automatic',
      target: 'es2020',
      format: 'esm',
      sourcemap: true,
      // Resolver modulos bare (react, react-dom, etc.)
      mainFields: ['module', 'main'],
      conditions: ['browser', 'module', 'import'],
      // Loader para .js files que contienen JSX
      loader: { '.js': 'jsx' }
    },

    // Configuraicion del reporte de cobertura
    coverageReporter: {
      dir: 'coverage/',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcov', subdir: 'lcov' },
        { type: 'text', subdir: '.', file: 'coverage.txt' },
        { type: 'text-summary', subdir: '.', file: 'coverage-summary.txt' }
      ],
      watermarks: {
        statements: [50, 80],
        branches: [50, 80],
        functions: [50, 80],
        lines: [50, 80]
      }
    },

    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    
    // Navegadores disponibles con fallback
    browsers: [browserToUse],
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
