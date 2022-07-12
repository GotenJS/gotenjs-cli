const paths = require("../paths");
const engines = require("../engines");

const configGotenText = (database) => {

    return `
const config = require('${paths.importPath(paths.initialFiles.gotenConfig, paths.initialFiles.config)}')
module.exports = config
${connectionString(database)}
`;
};

connectionString = (database) => {
    if(engines.isRelational(database)){
        return ""
    }else{
        return `module.exports.getConnectionStringToMongo = () => {
    const mongoConfig = config.db.mongo
    const mongoUsrPass = mongoConfig.usr ? \`\${mongoConfig.usr}:\${mongoConfig.pass}@\` : ""
    return \`mongodb://\${mongoUsrPass}\${mongoConfig.host}:\${mongoConfig.port}/\${mongoConfig.dbname}\`
}`
    }
}
module.exports = configGotenText;