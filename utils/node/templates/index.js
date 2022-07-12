const modelTemplate = require("./modelTemplate");
const migrationTemplate = require("./migrationTemplate");
const filterTemplate = require("./filterTemplate");
const dtoTemplate = require("./dtoTemplate");
const daoTemplate = require("./daoTemplate");
const assemblerTemplate = require("./assemblerTemplate");
const serviceTemplate = require("./serviceTemplate");
const controllerTemplate = require("./controllerTemplate");
const routerTemplate = require("./routerTemplate");
const appTemplate = require("./appTemplate");
const wwwTemplate = require("./wwwTemplate");
const genericFilterTemplate = require("./genericFilter");
const genericControllerTemplate = require("./genericController");
const genericDTOTemplate = require("./genericDTO");
const genericAssemblerTemplate = require("./genericAssembler");
const configTemplate = require("./configTemplate");
const configGotenTemplate = require("./configGotenTemplate");
const dotGotenTemplate = require("./dotGotenTemplate");
const versionedRoutesTemplate = require("./versionedRoutesTemplate");
const versionRouterTemplate = require("./versionRouterTemplate");
const sqlConfigTemplate = require("./sqlConfigTemplate");
const controllerAuthMethod = require("./controllerAuthMethod");
const controllerImportAuthUtils = require("./controllerImportAuthUtils");
const daoGetByUsernameMethod = require("./daoGetByUsernameMethod");
const authMiddlewareTemplate = require("./authMiddlewareTemplate");
const userAuthMiddlewareTemplate = require("./userAuthMiddlewareTemplate");
const serviceAuthMethod = require("./serviceAuthMethod");
const redisFileTemplate = require("./redisFileTemplate");
const secretsFileTemplate = require("./secretsFileTemplate");
const serviceSHA256Function = require("./serviceSHA256Function");
const gitignoreTemplate = require("./gitignoreTemplate");

module.exports = {
    modelTemplate,
    migrationTemplate,
    filterTemplate,
    dtoTemplate,
    daoTemplate,
    assemblerTemplate,
    serviceTemplate,
    controllerTemplate,
    routerTemplate,
    appTemplate,
    wwwTemplate,
    genericFilterTemplate,
    genericControllerTemplate,
    genericDTOTemplate,
    genericAssemblerTemplate,
    configTemplate,
    configGotenTemplate,
    dotGotenTemplate,
    versionedRoutesTemplate,
    versionRouterTemplate,
    sqlConfigTemplate,
    controllerAuthMethod,
    daoGetByUsernameMethod,
    authMiddlewareTemplate,
    userAuthMiddlewareTemplate,
    serviceAuthMethod,
    redisFileTemplate,
    secretsFileTemplate,
    serviceSHA256Function,
    controllerImportAuthUtils,
    gitignoreTemplate,
};