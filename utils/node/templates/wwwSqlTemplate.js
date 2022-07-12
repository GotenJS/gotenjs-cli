const wwwSqlText = () => {
    return `var app = require('../app')
const config = require('../../config/goten-config')
const serverConfig = config.server

console.log("Conectado a la base de datos")
app.listen(serverConfig.port, () => {
    console.log('Servidor escuchando peticiones')
})
`;
};
module.exports = wwwSqlText;
