const utils = require("../utils");

const reactTypes = {
    number: "Number",
    string: "String",
    boolean: "Boolean",
    date: "Date",
};

const isArrayProp = (prop) => {
    const type = getTypeOfProperty(prop).split("<")[0];
    return (type.toLowerCase() === "array");
};

const isNativeProp = (prop) => {
    return typeIsNative(getTypeOfProperty(prop));
};

const isCustomProp = (prop) => {
    return !isArrayProp(prop) && !isNativeProp(prop) && utils.regex.names.test(getTypeOfProperty(prop));
};

const isArrayCustomProp = (prop) => {
    return isArrayProp(prop) && !typeIsNative(getArrayType(prop));    
};

// name:string => string
// name:array<string> => array<string>
const getTypeOfProperty = (prop) =>{
    return prop.split(":")[1].trim();
};

// name:string => String
// name:array<date> => Date
// name:custom => Custom
const getFormatTypeOfProperty = (prop) => {
    const type = isArrayProp(prop) ? getArrayType(prop) : getTypeOfProperty(prop);
    return getFormatType(type);
};

// string => String
// Custom => Custom
const getFormatType = (type) => {
    return (typeIsNative(type)) ? reactTypes[type.toLowerCase()] : utils.capitalizeString(type.toLowerCase());
};

const typeIsNative = (type) => {
    const types = Object.keys(reactTypes);
    return types.includes(type.toLowerCase());
};

// name:array<string> => string
const getArrayType = (prop) => {
    const propType = getTypeOfProperty(prop);
    return propType.replace(/.*?\<(.*?)\>/g,"$1").trim();
};

// name:string => name
const getPropertyName = (prop) => {
    return prop.split(":")[0].trim();
};

// NAME:string => name
const getFormatPropertyName = (prop) => {
    return getPropertyName(prop).toLowerCase();
};

const containsCustomProp = (prop) => {
    return isArrayProp(prop)? isArrayCustomProp(prop): isCustomProp(prop);
};

// custom.name:string => custom
const getCustomClass = (internalModelProp) => {
    return internalModelProp.split(".")[0].trim();
};

// custom.name:string => Custom
const getFormatCustomClass = (internalModelProp) => {
    return utils.capitalizeString(getCustomClass(internalModelProp).toLowerCase());
};

// custom.name:string => name:string
const getCustomProp = (internalModelProp) => {
    return internalModelProp.split(".")[1];
};

// "Disco" => `disco:Disco`
const generatePropWithCustomClass = (customClassName) => {
    const propName = customClassName[0].toLowerCase() + customClassName.slice(1);
    return `${propName}:${customClassName}`;
};

// discos:array<disco> =>
// {
//     name: "discos",
//     type: "Disco",
//     isCustom: true,
//     isArray: true,
// }
const format = (prop) => {
    return {
        name: getFormatPropertyName(prop),
        type: getFormatTypeOfProperty(prop),
        isCustom: containsCustomProp(prop),
        isArray: isArrayProp(prop),
    };
};
const routeAuth = (options) => {
    
    let authP = 'Route';
    let importR = `import { Route } from 'react-router-dom'`
    if (options.auth) {
        authP = 'PrivateRoute';
        importR = `import PrivateRoute from '../../auth/PrivateRoute'`

    }
    return {authPath: authP,importRoute: importR};
};

module.exports = {
    ...utils,
    reactTypes,
    isArrayProp,
    isNativeProp,
    isCustomProp,
    isArrayCustomProp,
    getTypeOfProperty,
    getFormatTypeOfProperty,
    getFormatType,
    typeIsNative,
    getArrayType,
    getPropertyName,
    getFormatPropertyName,
    containsCustomProp,
    getCustomClass,
    getFormatCustomClass,
    getCustomProp,
    generatePropWithCustomClass,
    format,
    routeAuth
};