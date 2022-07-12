const mogooseSchemaTypes = {
    string: "String",
    number: "Number",
    date: "Date",
    buffer: "Buffer",
    boolean: "Boolean",
    mixed: "Schema.Types.Mixed",
    objectid: "Schema.Types.ObjectId",
    array: "[]",
    decimal128: "Schema.Types.Decimal128",
    map: "Map",
};

const mongooseArrayTypes = {
    string: "String",
    number: "Number",
    date: "Date",
    boolean: "Boolean",
};

const sequelizeSchemaTypes = {
    string: "STRING",
    integer: "INTEGER",
    float: "FLOAT",
    date: "DATE",
    boolean: "BOOLEAN",
    text: "TEXT",
    decimal: "DECIMAL",
    bigint: "BIGINT",
    double: "DOUBLE",
};

const engines = {
    mongodb: {
        name: "mongo",
        port: 27017,
        relational: false,
        types: mogooseSchemaTypes,
        arrayTypes: mongooseArrayTypes,
    },
    mysql: {
        name: "mysql",
        port: 3306,
        relational: true,
        types: sequelizeSchemaTypes,
    },
    mariadb: {
        name: "mariadb",
        port: 3306,
        relational: true,
        types: sequelizeSchemaTypes,
    },
};

const getEnginesNames = () => {
    return Object.keys(engines).map(key => {
        return engines[key].name;
    });
};

const isRelational = (name) => {
    const lowerName = name.toLowerCase();
    return Object.keys(engines).some(key => engines[key] && engines[key].relational && engines[key].name === lowerName);
};

const getEngineByName = (name) => {
    const enginesNames = Object.keys(engines);
    const lowerName = name ? name.toLowerCase() : "mongodb";
    return enginesNames.includes(lowerName) ? engines[lowerName] : engines.mongodb;
};

const getIdKey = (name) => {
    switch (name) {
        case "mongo":
            return "_id";
            break;
        default:
            return "id";
            break;
    }
};

const getTypesByEngine = (engineName) => {
    return getEngineByName(engineName).types;
};

const getArrayTypesByEngine = (engineName) => {
    const engine = getEngineByName(engineName);
    if(engine.relational) return {};
    return engine.arrayTypes;
};

const supportsEngine = (engineName) => {
    return getEnginesNames().includes(engineName.toLowerCase());
};

module.exports = {
    ...engines,
    getEnginesNames,
    isRelational,
    getEngineByName,
    getIdKey,
    getTypesByEngine,
    getArrayTypesByEngine,
    supportsEngine,
};