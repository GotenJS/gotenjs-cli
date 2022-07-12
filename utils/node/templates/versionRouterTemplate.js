const versionRouterText = () => {
    return `const GotenVersion = require('goten-versioning').GotenVersion
//<import-routes>
//</import-routes>

const version = new GotenVersion([
//<routes>
//</routes>
])

module.exports = version`;
};

module.exports = versionRouterText;
