// Ensure all files in src folder are loaded for proper code coverage analysis.
const coreSourceContext = require.context('../../src/core', true, /.*?(?=\.spec).*?\.js/);

coreSourceContext.keys().forEach(coreSourceContext);