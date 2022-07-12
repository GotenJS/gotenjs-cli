const paths = require("../paths");

const routerText = (name) => {
    const lowerName = name.toLowerCase();
    return `const express = require('express')
const ${name}Controller = require('${paths.importPath(paths.dirs.routes, paths.dirs.controllers + lowerName + "Controller")}');

const api = express.Router();

api.get('/:id', ${name}Controller.get${name}ById);
api.get('', ${name}Controller.get${name}s);
api.post('', ${name}Controller.create${name});
api.put('/:id', ${name}Controller.update${name});
api.delete('/:id', ${name}Controller.delete${name});

module.exports = api;`;
};

module.exports = routerText;
