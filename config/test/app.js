// Ensure all files in src folder are loaded for proper code coverage analysis.
const appSourceContext = require.context('../../src/app', true, /.*?(?=\.spec).*?\.js/);

appSourceContext.keys().forEach(appSourceContext);