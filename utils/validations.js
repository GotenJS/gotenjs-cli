const utils = require("./utils");
const paths = require("./paths");
const gotenManager = require("./gotenManager");
const fs = require("fs");
const path = require("path");


const canAddAuthorization = (options) => {
    if (!gotenManager.isGotenProject()) utils.gotenError("[ERROR] El proyecto se debe haber creado con GotenJS");
    if (hasAuth()) utils.gotenError("[ERROR] Ya ha ejecutado 'auth' previamente");
    if (extraParameters(options)) utils.gotenError("[ERROR] El comando utilizado no debe contener parametros")
};

const extraParameters = (options) => {
    return typeof options != "object";
}

const canAddFavicon = (pathLocal) =>{
    console.log("[INFO]  - Path: " + `${path.resolve(pathLocal)}` )
    if (!fs.existsSync(pathLocal)) utils.gotenError("[ERROR] - Archivo inexistente.\n");
    if (!fileExtensionsValidation(pathLocal)) utils.gotenError("[ERROR] - Formato incompatible.\n[INFO]  - Formatos aceptables : ico, jpeg, jpg y png.\n");
}

const canGenerateABM = (nameABM, options) => {
    if (!gotenManager.isGotenProject()) utils.gotenError("[ERROR] El proyecto se debe haber creado con GotenJS");
    if (!utils.regex.names.test(nameABM)) utils.gotenError("[ERROR] - El nombre del ABM debe ser alfanumérico y comenzar con una letra.\n");
    if (options.auth && !hasAuth()){
        utils.gotenError("[ERROR] - La opcion --auth solo se puede utilizar si se ejecuto goten auth previamente.\n");
    }
    return
}

const hasAuth = () => {
    const gotenData = utils.loadJson(paths.initialFiles.dotGoten);
    if(gotenData.commands){
        return gotenData.commands.includes("auth");
    }else{
        return false;
    }
};

const fileExtensionsValidation = (pathLocal) => {
    var allowedExtensions = /(.jpg|.jpeg|.png|.ico)$/i;
    return allowedExtensions.test(pathLocal);
};

module.exports = {
    canAddAuthorization,
    canAddFavicon,
    canGenerateABM
};