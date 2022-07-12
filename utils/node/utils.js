const fs = require("fs");
const engines = require("./engines");
const paths = require("./paths");
const utils = require("../utils");

const obtainModelProperties = (name, options) => {
    const lowerName = name.toLowerCase();
    const model = fs.readFileSync(`${paths.dirs.models}${lowerName}.js`, "utf8");
    if (engines.isRelational(options.database.name)) {
        //primero obtengo las properties internas
        let startArray = `.define('${name}', {\n`;
        let initIndex = model.indexOf(startArray) + startArray.length;
        let lastIndex = model.indexOf("}, {");
        let props = model.substring(initIndex, lastIndex).split("\n").map(prop => getPropertyName(prop)).filter(p => p.length > 0);
        startArray = "//<associations>\n";
        //luego las relaciones
        initIndex = model.indexOf(startArray) + startArray.length;
        lastIndex = model.indexOf("//</associations>");
        props = props.concat(model.substring(initIndex, lastIndex).split("\n").filter(row => row.indexOf("as: ") >= 0).map(prop => prop.split(":")[1].replace(",", "").trim()).filter(p => p.length > 0).map(r => r.replace(/'/g, "")));
        return props;
    } else {
        const startArray = "Schema({\n";
        const initIndex = model.indexOf(startArray) + startArray.length;
        const lastIndex = model.indexOf("})");
        return model.substring(initIndex, lastIndex).split("\n").map(prop => getPropertyName(prop)).filter(p => p.length > 0);
    }
};

const getLastVersionNumber = () => {
    const regexVNumber = new RegExp("^v[0-9]+$");
    return fs.readdirSync(paths.dirs.routes)
        .filter(dir => dir.match(regexVNumber))
        .map(versionDir => parseInt(versionDir.slice(1)));
};

const getLastVersion = () => {
    return `v${getLastVersionNumber()}`;
};

const getNextVersion = () => {
    return `v${getLastVersionNumber() + 1}`;
};

// palabras:array<string> =>
// {
//     name: "palabras",
//     type: "String", // en mongo
//     isArray: true,
//  isCustom: false
// }
const format = (prop, engine) => {
    return {
        name: getFormatPropertyName(prop),
        type: (isArrayProp(prop) ?
            getFormatArrayType(prop, engine) :
            getFormatTypeOfProperty(prop, engine)),
        isArray: isArrayProp(prop),
        isCustom: !typeIsNative((isArrayProp(prop) ?
            getArrayType(prop) :
            getTypeOfProperty(prop)), engine)
    };
};

const typeIsNative = (type, engine) => {
    const types = Object.keys(engine.types); 
    return types.includes(type.toLowerCase());
};

const isArrayProp = (prop) => {
    const propType = getTypeOfProperty(prop);
    return getArrayType(prop) !== propType;
};

// name:[string] => string
const getArrayType = (prop) => {
    const propType = getTypeOfProperty(prop);
    return propType.replace(/.*?\[(.*?)\]/g, "$1").trim();
};

// name:[string] => String
const getFormatArrayType = (prop, engine) => {
    return getFormatType(getArrayType(prop), engine);
};

// name:string => string
// name:[string] => [string]
const getTypeOfProperty = (prop) => {
    return prop.split(":")[1].trim();
};

// name:string => name
const getPropertyName = (prop) => {
    return prop.split(":")[0].trim();
};

// NAME:string => name
const getFormatPropertyName = (prop) => {
    return getPropertyName(prop).toLowerCase();
};

// Devuelve el tipo en `name:type` prop.
// name:string => String
// name:[date] => Date
// name:custom => Custom
const getFormatTypeOfProperty = (prop, engine) => {
    const type = getTypeOfProperty(prop).toLowerCase();
    return getFormatType(type, engine);
};

// string => String
// Custom => Custom
const getFormatType = (type, engine) => {
    const nodeTypes = engine.types;
    return (typeIsNative(type, engine) ? nodeTypes[type.toLowerCase()] : utils.capitalizeString(type.toLowerCase()));
};

module.exports = {
    ...utils,
    obtainModelProperties,
    getLastVersion,
    getNextVersion,
    format,
    typeIsNative,
    isArrayProp,
    getArrayType,
    getTypeOfProperty,
    getFormatPropertyName,
    getPropertyName,
};