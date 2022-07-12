const validations = require("../validations");
const engines = require("./engines");
const utils = require("../utils");
const paths = require("./paths");
const fs = require("fs");
const gotenManager = require("./gotenManager")

const canCreateProject = (projectName, options) => {
    if(options.database && !engines.supportsEngine(options.database))
        utils.gotenError(`Engine ${options.database} no soportada`);
};

const canGenerateABM = (name, options) => {
    // Validacion general
    validations.canGenerateABM(name,options)

    // Patrón de inspección para encontrar ABM existente
    const pattern = `${name.toLowerCase()}Router`;
    const fileInspect = `${paths.initialFiles.app}.js`
    if (fs.readFileSync(fileInspect).includes(pattern)) utils.gotenError("[ERROR] - El ABM ya existe")

    // Validación de las props de Node con su correspondiente base de datos
    const engine = gotenManager.getEngineDatabase()
    var properties = [];
    options.props.forEach(prop => {
        if (!validProp(prop, engine)) utils.gotenError(`[ERROR] - la prop ${prop} no es válida\n`)
        
        propName = prop.split(":")[0]
        if (properties.includes(propName))utils.gotenError(`[ERROR] - la prop ${propName} ya existe\n`);
        else properties.push(propName);

    });
}

const validProp = (prop, database) => {
    const elements = prop.split(":");
    const nameProp = elements[0];
    const typeProp = elements[1];
    const content = typeProp.match(new RegExp('\\[' + "(.*)" + '\\]'));
    const typeNative = content ? content[1] : typeProp

    return elements.length == 2 &&
        utils.regex.names.test(nameProp) &&
        !!engines[database].types[typeNative.toLowerCase()]
}

module.exports = {
    ...validations,
    canCreateProject,
    canGenerateABM
};