const validations = require("../validations");
const utils = require("./utils");
const paths = require("./paths");
const fs = require("fs");

const canGenerateABM = (name, options) => {
    // Validacion general
    validations.canGenerateABM(name, options)
    
    // Patrón de inspección para encontrar ABM existente
    const fileInspect = `${paths.dirs.modules}${utils.capitalizeString(name.toLowerCase())}`
    if(fs.existsSync(fileInspect)) utils.gotenError("[ERROR] - El ABM ya existe")

    // Validación de las props
    var properties = [];
    options.props.forEach(prop => {
        if(!validProp(prop))utils.gotenError(`[ERROR] - la prop ${prop} no es válida\n`)

        propName = prop.split(":")[0]
        if (properties.includes(propName))utils.gotenError(`[ERROR] - la prop ${propName} ya existe\n`);
        else properties.push(propName);

    });

    // Validación de las internalProps
    options.internalModels.forEach(prop => {
        
        if(!validInternalProp(prop)){
            utils.gotenError(`[ERROR] - la prop custom ${prop} no es válida\n`)
        }
    })
}

const validProp = (prop) => {
    const elements = prop.split(":")
    const nameProp = elements[0]

    return elements.length == 2 &&
        utils.regex.names.test(nameProp) &&
        (utils.isNativeProp(prop) | utils.isArrayProp(prop) | utils.isCustomProp(prop) | utils.isArrayCustomProp(prop))
}

const validInternalProp = (prop) => {
    const elements = prop.split(".")
    const customName = elements[0]
    const customElements = utils.getCustomProp(prop).split(":")
    const customProp = customElements[0]

    return elements.length == 2 &&
        customElements.length == 2 &&
        utils.regex.names.test(customName) &&
        utils.regex.names.test(customProp) &&
        (utils.isNativeProp(prop) | utils.isArrayProp(prop))
}

module.exports = {
    ...validations,
    canGenerateABM
};