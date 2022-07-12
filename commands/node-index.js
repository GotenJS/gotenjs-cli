const utils = require("../utils/utils");
const validations = require("../utils/node/validations");
const nodeCommands = require("./node-commands");

let nodeIndexObj = {};

nodeIndexObj.addAuthorization = utils.validateCommand(validations.canAddAuthorization, nodeCommands.addAuthorization);
nodeIndexObj.createProjectCommand = utils.validateCommand(validations.canCreateProject, nodeCommands.createProjectCommand);
nodeIndexObj.generateABM = utils.validateCommand(validations.canGenerateABM, nodeCommands.generateAllCommand);

module.exports =  {
    ...nodeCommands,
    ...nodeIndexObj
};