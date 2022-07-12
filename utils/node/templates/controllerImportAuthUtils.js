const controllerImportAuthUtils = (useSingleSignOn) => `\nconst jsonwebtoken = require('jsonwebtoken')
const secrets = require('../utils/secrets')
${useSingleSignOn ? "const Redis = require('../utils/redis')" : ""}
`;
module.exports = controllerImportAuthUtils;