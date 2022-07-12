const utils = require("../utils");
const fs = require("fs");

const angularTypes = {
    number: "number",
    string: "string",
    boolean: "boolean",
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
    return !isArrayProp(prop) && !isNativeProp(prop) && utils.regex.names.test(getTypeOfProperty(prop))
};

const isArrayCustomProp = (prop) => {
    return isArrayProp(prop) && !typeIsNative(getArrayType(prop));
};

// name:string => string
// name:array<string> => array<string>
const getTypeOfProperty = (prop) => {
    return prop.split(":")[1].trim();
};

// string => String
// Custom => Custom
const getFormatType = (type) => {
    return (typeIsNative(type)) ? angularTypes[type.toLowerCase()] : utils.capitalizeString(type.toLowerCase());
};

// name:string => String
// name:array<date> => Date
// name:custom => Custom
const getFormatTypeOfProperty = (prop) => {
    const type = isArrayProp(prop) ? getArrayType(prop) : getTypeOfProperty(prop);
    return getFormatType(type);
};

const typeIsNative = (type) => {
    const types = Object.keys(angularTypes);
    return types.includes(type.toLowerCase());
};

const typeIsDate = (type) => {
    return type.toLowerCase() === angularTypes.date.toLowerCase();
};

// name:array<string> => string
const getArrayType = (prop) => {
    const propType = getTypeOfProperty(prop);
    return propType.replace(/.*?\<(.*?)\>/g, "$1").trim();
};

// name:string => name
const getPropertyName = (prop) => {
    return prop.split(":")[0].trim();
};

// NAME:string => name
const getFormatPropertyName = (prop) => {
    return getPropertyName(prop).toLowerCase();
};

// naME:string => name: String
// naME:array<string> => name: Array<String>
const getDefineProp = (prop) => {
    const name = getFormatPropertyName(prop);
    const formatType = getFormatTypeOfProperty(prop);
    const type = isArrayProp(prop) ? `Array<${formatType}>` : formatType;
    return `${name}: ${type}`;
};

const containsCustomProp = (prop) => {
    return isArrayProp(prop) ? isArrayCustomProp(prop) : isCustomProp(prop);
};

// custom.name:string => custom
const getCustomClassName = (internalModelProp) => {
    return internalModelProp.split(".")[0].trim();
};

// custom.name:string => Custom
const getFormatCustomClassName = (internalModelProp) => {
    return utils.capitalizeString(getCustomClassName(internalModelProp).toLowerCase());
};

// custom.name:string => name:string
const getCustomProp = (internalModelProp) => {
    return internalModelProp.split(".")[1];
};

// "Disco" => `disco:Disco`
const generatePropWithCustomClass = (customClassName) => {
    const propName = customClassName[0].toLowerCase() + customClassName.slice(1);
    return `${propName}: ${customClassName}`;
};

const removeRuleFromLint = (place, rule) => {
    const tslintJson = JSON.parse(fs.readFileSync("src/tslint.json"));
    tslintJson.rules[place] = tslintJson.rules[place].filter((o) => o !== rule);
    fs.writeFileSync("src/tslint.json", JSON.stringify(tslintJson, null, 4));
};

// discos:array<disco> =>
// {
// 	name: "discos",
// 	type: "Disco",
// 	isCustom: true,
// 	isArray: true,
// }
const format = (prop) => {
    return {
        name: getFormatPropertyName(prop),
        type: getFormatTypeOfProperty(prop),
        isCustom: containsCustomProp(prop),
        isArray: isArrayProp(prop),
    };
};

module.exports = {
    ...utils,
    angularTypes,
    isArrayProp,
    isNativeProp,
    isCustomProp,
    isArrayCustomProp,
    getTypeOfProperty,
    getFormatType,
    getFormatTypeOfProperty,
    typeIsNative,
    typeIsDate,
    getArrayType,
    getPropertyName,
    getFormatPropertyName,
    getDefineProp,
    containsCustomProp,
    getCustomClassName,
    getFormatCustomClassName,
    getCustomProp,
    generatePropWithCustomClass,
    removeRuleFromLint,
    format,
};
