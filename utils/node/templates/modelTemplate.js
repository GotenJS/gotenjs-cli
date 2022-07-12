const engines = require("../engines");

const modelMongo = require("./modelMongoTemplate");
const modelSql = require("./modelSqlTemplate");

const modelText = (name, options) => {
    const fields = options.props;
    return engines.isRelational(options.database.name) ?
        modelSql(name, fields, options.database) :
        modelMongo(name, fields, options.database);
};
module.exports = modelText;