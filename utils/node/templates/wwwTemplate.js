const engines = require("../engines");

const wwwMongo = require("./wwwMongoTemplate");
const wwwSql = require("./wwwSqlTemplate");

const wwwText = (options) => {
    return engines.isRelational(options.database.engine) ? wwwSql(options) : wwwMongo(options);
};
module.exports = wwwText;
