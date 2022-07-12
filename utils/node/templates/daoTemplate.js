const engines = require("../engines");

const daoSql = require("./daoSqlTemplate");
const daoMongo = require("./daoMongoTemplate");

const daoText = (name, options) => {
    return engines.isRelational(options.database.name) ? daoSql(name) : daoMongo(name);
};

module.exports = daoText;