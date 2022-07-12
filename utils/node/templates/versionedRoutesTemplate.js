const versionedRoutesText = (name, version) => {
    const lowerName = name.toLowerCase();
    return `const GotenRoute = require('goten-versioning').GotenRoute
const METHOD = require('goten-versioning').GotenMethods
let ${name}Controller = require('../../controllers/${version}/${lowerName}Controller');

const api = [
    new GotenRoute(METHOD.GET, "/${lowerName}s/:id", [${name}Controller.get${name}ById]),
    new GotenRoute(METHOD.GET, "/${lowerName}s", [${name}Controller.get${name}s]),
    new GotenRoute(METHOD.POST, "/${lowerName}s/", [${name}Controller.create${name}]),
    new GotenRoute(METHOD.PUT, "/${lowerName}s/:id", [${name}Controller.update${name}]),
    new GotenRoute(METHOD.DELETE, "/${lowerName}s/:id", [${name}Controller.delete${name}]),
]

module.exports = api`;
};

module.exports = versionedRoutesText;
