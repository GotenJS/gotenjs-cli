const engines = require("./engines");
const paths = require("./paths");
const path = require("path");
const utils = require("./utils");

const getDefaultDatabaseOptions = (options) => {
    const defaultDb = engines.getEngineByName(options.database.dbname);
    return {
        dbname: options.projectName || path.basename(process.cwd()),
        engine: defaultDb.name,
        host: "127.0.0.1",
        port: defaultDb.port,
    };
};

const getDefaultCreateOptions = (options) => {
    const newOptions = {...options};
    newOptions.database = getDefaultDatabaseOptions(options);
    newOptions.database = { ...newOptions.database, ...options.database };
    newOptions.port = 3800;
    return newOptions;
};

const formatDBOption = (options) => {
    const dbOptions = {	};
    if(options.database) dbOptions.engine = options.database;
    if(options.dbname) dbOptions.dbname = options.dbname;
    if(options.dbhost) dbOptions.host = options.dbhost;
    if(options.dbport) dbOptions.port = options.dbport;
    if(options.dbuser) dbOptions.user = options.dbuser;
    if(options.dbuser && options.dbpass) dbOptions.pass = options.dbpass;
    return dbOptions;
};

const getEngineDatabase = (options, gotenData = undefined) => {
    if (!options.database || !options.database.engine) {
        return getDefaultDatabase(gotenData);
    }
    return options.database;
};

const getDefaultDatabase = (gotenData = undefined) => {
    if (!gotenData) {
        gotenData = utils.loadJson(paths.initialFiles.dotGoten);
    }
    return engines.getEngineByName(gotenData.dbs[0]);
};

module.exports = {
    getDefaultCreateOptions,
    formatDBOption,
    getEngineDatabase,
    getDefaultDatabaseOptions,
};