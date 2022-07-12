const utils = require("../utils/utils")
const paths = require("../utils/paths");

const inputValidate = (properties, inputValue) => {
    const value = utils.getArrayType(String(inputValue));
    if (!value.length > 0 && !utils.regex.names.test(value)){
        return false;
    }
    if (properties.includes(value)){
        utils.gotenError(`[ERROR] - la prop ${value} ya existe\n`);
        return false;
    }    
    properties.push(value);
    return true;
    
};

const requiredValue = (value) => {
    return String(value).length > 0;    
};

module.exports = {
    inputValidate,
    requiredValue
};