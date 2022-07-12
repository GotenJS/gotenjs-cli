const appText = (plugins) => {
    const imports = getImports(plugins);
    const routes = getRoutes(plugins.includes("versioning"));

    return `${imports}
const app = express();
const cors = require('cors')

//cors
app.use(cors())

//middleware
    //body-parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

${routes}

//erros
app.use((req, res, next) => {
    var error = new Error('Not found.')
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    const status = err.status || 500;
    if (status >= 500) console.log(err);
    res.status(status).send({
        error: err.message
    })
})

module.exports = app;`;
};

const getImports = (plugins) => {
    let imports = `var express = require('express');
const bodyParser = require('body-parser');
`;
    
    if (plugins.includes("versioning")){
        imports += `
const GotenRouteVersioner = require('goten-versioning').GotenRouteVersioner
const gotenVersionManager = require('goten-versioning').GotenVersionManager
`;
    }
    imports += `//<import-routes>
//</import-routes>`;
    return imports;
};

const getRoutes = (useVersioning) => {
    return useVersioning ? `const routeVersioner = new GotenRouteVersioner([
//<goten-routes>
//</goten-routes>
])
//<routes>
gotenVersionManager.createRoutes(routeVersioner.getVersionedRoutes())
app.use(gotenVersionManager.getRouter())
//</routes>` : `//<routes>
//</routes>`;
};

module.exports = appText;