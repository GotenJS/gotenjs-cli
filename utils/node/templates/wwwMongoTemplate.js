const paths = require("../paths");

const wwwMongoText = (options) => {
    return `const mongoose = require('mongoose');
const app = require('${paths.importPath(paths.initialFiles.www, paths.initialFiles.app)}');

const config = require('${paths.importPath(paths.initialFiles.www, paths.initialFiles.gotenConfig)}');
const serverConfig = config.server;

mongoose.connect(config.getConnectionStringToMongo(), {})
    .then(() => {
        console.log("Conectado a la base de datos");
        app.listen(serverConfig.port, () => {
            console.log('Servidor escuchando peticiones');
        })
    })
    .catch((err) => {
        console.log(err);
    })`;
};
module.exports = wwwMongoText;
