const action = require("../actions/node-actions");
const engines = require("../utils/node/engines");
const utils = require("../utils/node/utils");
const { gotenTechnologyConfig } = require("../utils/utils");
const logger = require("../utils/logger");
const fs = require("fs");
const paths = require("../utils/node/paths");
const questions = require("../questions/nodeQuestions");
const optionsManager = require("../utils/node/optionManager");
const { gotenPlugins, ...gotenManager } = require("../utils/node/gotenManager");

const createProjectCommand = async (projectName, options) => {
    options.projectName = projectName;
    options.database = optionsManager.formatDBOption(options);
    options = options.yes ?
        optionsManager.getDefaultCreateOptions(options) :
        await questions.getCreateOptions(options);
    console.log("Creando proyecto, espere unos instantes");
    action.createBaseProject(options);
    action.createDirectories(options);
    action.createGenerics(options);
    action.createInitialFiles(options);
    if (options.versioning) {
        action.createVersion("v1");
    }
    action.execInto(projectName, action.addDBConfig, options.database);
};

const generateAllCommand = async (modelName, options) => {
    try {
        let versionName;
        const plugins = gotenManager.getProjectPlugins();
        if (gotenManager.includePlugin(gotenPlugins.versioning)) {
            versionName = "v";
            versionName += options.versioning ? options.versioning : utils.getLastVersion();
        }
        options.database = optionsManager.getEngineDatabase(options);
        if (options.props.length === 0) {
            options.props = await questions.defineProps(modelName, options);
        }

        modelName = utils.capitalizeString(modelName);
        //TODO: crear modelos custom
        action.createModel(modelName, options);
        action.createFilter(modelName, options.props);
        //TODO: crear dtos custom
        action.createDTO(modelName, options.props);
        action.createDAO(modelName, options);
        //TODO: crear assembles custom
        action.createAssembler(modelName, options);
        action.createService(modelName, options);
        action.createController(modelName, plugins, versionName);
        action.createRouter(modelName, plugins, versionName);
        action.registerRoute(modelName, plugins, versionName, options.auth);
        action.evaluateAutorunMigrations(options);
    } catch (e) {
        console.error(e)
    }
};

const createModelCommand = async (modelName, options) => {
    options.database = optionsManager.getEngineDatabase(options);
    if (options.props.length === 0) {
        options.props = await questions.defineProps(modelName, options);
    }
    modelName = utils.capitalizeString(modelName);
    action.createModel(modelName, options);
    action.createDTO(modelName, options.props);
    action.createAssembler(modelName, options);
    action.evaluateAutorunMigrations(options);
};

const createDatabaseCommand = async (engineName, options) => {
    options.database = engineName;
    if (engines.supportsEngine(engineName)) {
        options.database = optionsManager.formatDBOption(options);
        options.database = options.yes ?
            optionsManager.getDefaultDatabaseOptions(options) :
            await questions.getDatabaseOptions(options);
        action.addDBConfig(options.database);
    } else {
        console.log("motor no soportado", engineName);
    }
};

const generateVersionCommand = (options) => {
    const version = utils.getNextVersion();
    action.createVersion(version);
};

const migrateCommand = (options) => {
    action.runMigrations();
};

const addAuthorization = async (options) => {
    options.auth = await questions.getAuthOptions(options);
    action.addAuthorization(options);
};

module.exports = {
    createProjectCommand,
    generateAllCommand,
    createModelCommand,
    createDatabaseCommand,
    generateVersionCommand,
    migrateCommand,
    addAuthorization,
};