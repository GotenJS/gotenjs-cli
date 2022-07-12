const action = require("../actions/react-actions");
const questions = require("../questions/reactQuestions");
const reactUtils = require("../utils/react/utils");
const fs = require("fs");
const logger = require("../utils/logger");
const GREEN = "\033[0;32m";
const RED = "\033[0;31m";
const NC = "\033[0;m";
const paths = require("../utils/react/paths");
const utils = require("../utils/utils.js");

const createProjectCommand = async (projectName, options) => {
    options.projectName = projectName;
    if (!fs.existsSync(projectName)) {
        if (!options.api) {
            options.api = await questions.defineApi();
        }
        if (options.yes) {
            options.api = "http://localhost:3800";
        }
        action.createBaseProject(projectName);
        action.createDirectories(options);
        action.createGenericComponents(options);
        if(options.redux){
            action.createReduxComponents(options);
            action.createReduxFiles(options);
        }else{
            action.createComponents(options);
            action.createFiles(options);
        }
        action.installDependencies(options);
        process.stdout.write(`${GREEN}Finalizado.${NC}\n`);
    } else {
        process.stdout.write(`[${RED}ERROR${NC}] - La carpeta "${projectName}" ya existe.\n`);
        return;
    }
};

const createABM = async (name, options) => {
    try {
        name = reactUtils.capitalizeString(name);
        if (options.props.length === 0 && (options.internalModels.length === 0)) {
            options.props = await questions.defineProps(name);
        }
        if (existsIndependentCustomModel(options)) {
            options.props.concat(getDefaultCustomProperties(options));
        }
        options.internalModels = formatEntities(options);
        options.internalModels = await questions.defineEntities(options);
        if(utils.gotenTechnologyConfig().architecture === "redux"){
            action.createABMReduxFolder(name, options);
            action.createReducer(name);
            action.modifyExistingReduxFiles(name, options);
        }else{ //Context
            action.createABMFolder(name, options);
            action.modifyExistingFiles(name, options);
        }
        action.createUtilsFile(name);
        process.stdout.write(`${GREEN}Finalizado.${NC}\n`);
    } catch (e) {
        console.error(e)
    }
};

const createFavicon = async (pathLocal) => {
    logger.log("[INFO]  - Asignando Favicon al browser...");
    fs.createReadStream(pathLocal)
        .pipe(fs.createWriteStream(process.cwd() + '/' + paths.dirs.public + paths.files.public.icon));
};

const createAuth = () => {
    action.addAuthorization();
};

const getIndependentCustomModel = (options) => {
    const customTypesOfProperties = [...new Set(
        options.props
            .filter(prop => reactUtils.containsCustomProp(prop))
            .map(prop => reactUtils.getFormatTypeOfProperty(prop))
    )];
    const customTypesDefined = [...new Set(
        options.internalModels.map(internalModel => reactUtils.getFormatCustomClass(internalModel))
    )];
    return customTypesDefined
        .filter(customTypeDefined => !customTypesOfProperties.includes(customTypeDefined));
};

const getDefaultCustomProperties = (options) => {
    return getIndependentCustomModel(options)
        .map(customClass => options.props.push(reactUtils.generatePropWithCustomClass(customClass)));
};

const existsIndependentCustomModel = (options) => {
    return getIndependentCustomModel(options).length > 0;
};

const formatEntities = (options) => {
    const models = [];
    if (options.internalModels) {
        options.internalModels.forEach(element => {
            const customName = reactUtils.getFormatCustomClass(element);
            const customModel = models.find(model => model.className === customName);
            const prop = reactUtils.getCustomProp(element);
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
    createABM,
    createFavicon,
    createAuth
};