const utils = require("../utils/utils");
const validations = require("../utils/angular/validations");
const angularCommands = require("./angular-commands");

let angularIndexObj = {};
angularIndexObj.addAuthorization = utils.validateCommand(validations.canAddAuthorization, angularCommands.createAuth);
angularIndexObj.addFavicon = utils.validateCommand(validations.canAddFavicon, angularCommands.createFavicon);
angularIndexObj.generateABM = utils.validateCommand(validations.canGenerateABM, angularCommands.createAll);

module.exports =  {
    ...angularCommands,
    ...angularIndexObj
};