const sqlConfigText = (engineName) => {
    return `const config = require('./goten-config');
module.exports = {
    development: {
    username: config.db.${engineName}.usr,
    password: config.db.${engineName}.pass,
    database: config.db.${engineName}.dbname,
    host: config.db.${engineName}.host,
    dialect: "${engineName}"
    },
    test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "${engineName}"
    },
    production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "${engineName}"
    }
}
`;
};

module.exports = sqlConfigText;