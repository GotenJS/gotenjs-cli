const action = require("../actions/angular-actions");
const questions = require("../questions/angularQuestions");
const utils = require("../utils/angular/utils");
const paths = require("../utils/angular/paths");
const fs = require("fs");
const logger = require("../utils/logger");

const createProjectCommand = async (projectName, options) => {
    options.projectName = projectName;
    if (!options.api) {
        options.api = await questions.defineApi();
    }
    if (!options.primary) {
        options.primary = "$blue !default";
    }
    if (!options.danger) {
        options.danger = "$red !default";
    }
    if (!options.success) {
        options.success = "$green !default";
    }
    if (!options.info) {
        options.info = "$cyan !default";
    }
    if (!options.warning) {
        options.warning = "$yellow !default";
    }
    if (!options.secondary) {
        options.secondary = "$gray-600 !default";
    }

    action.createBaseProject(projectName);
    action.createDirectories(options);
    action.createGenerics(options);
    action.createInitialFiles(options);
    action.registerApi(options);
};

const createAll = async (name, options) => {
    try {
        name = utils.capitalizeString(name);
        if ((options.props.length === 0) && (options.internalModels.length === 0)) {
            options.props = await questions.defineProps(name);
        }
        if (existsIndependentCustomModel(options)) {
            options.props.concat(getDefaultCustomProperties(options));
        }
        options.internalModels = formatEntities(options);
        options.internalModels = await questions.defineEntities(options);
        action.createDTO(name, options);
        action.createFilter(name, options);
        action.createResponse(name, options);
        action.createComponents(name, options);
        action.createServiceABM(name, options);
        action.registerRoute(name, options);
        action.registerMenu(name, options);
    } catch (e) {
        console.error(e);
    }
};


const createFavicon = async (pathLocal) => {
    logger.log("[INFO]  - Asignando Favicon al browser...");
    fs.createReadStream(pathLocal)
        .pipe(fs.createWriteStream(paths.initialFiles.favicon));
};

const createAuth = () => {
    action.addAuthorization();
};

const getDefaultCustomProperties = (options) => {
    return getIndependentCustomModel(options)
        .map(customClass => options.props.push(utils.generatePropWithCustomClass(customClass)));
};

const existsIndependentCustomModel = (options) => {
    return getIndependentCustomModel(options).length > 0;
};

const getIndependentCustomModel = (options) => {
    const customTypesOfProperties = [...new Set(
        options.props
            .filter(prop => utils.containsCustomProp(prop))
            .map(prop => utils.getFormatTypeOfProperty(prop)))];
    const customTypesDefined = [...new Set(
        options.internalModels.map(internalModel => utils.getFormatCustomClassName(internalModel))
    )];

    return customTypesDefined
        .filter(customTypeDefined => !customTypesOfProperties.includes(customTypeDefined));
};

const formatEntities = (options) => {
    const models = [];
    if (options.internalModels) {
        options.internalModels.forEach(element => {
            const customName = utils.getFormatCustomClassName(element);
            const customModel = models.find(model => model.className === customName);
            const prop = utils.getCustomProp(element);
            if (customModel) {
                customModel.props.push(prop);
            } else {
                models.push({
                    className: customName,
                    props: [prop]
                });
            }
        });
    }
    return models;
};

module.exports = {
    createProjectCommand,
    createAll,
    createFavicon,
    createAuth,
};