const utils = require("../utils/utils");
const validations = require("../utils/react/validations");
const reactCommands = require("./react-commands");

let reactIndexObj = {};
reactIndexObj.addAuthorization = utils.validateCommand(validations.canAddAuthorization, reactCommands.createAuth);
reactIndexObj.addFavicon = utils.validateCommand(validations.canAddFavicon, reactCommands.createFavicon);
reactIndexObj.generateABM = utils.validateCommand(validations.canGenerateABM, reactCommands.createABM);

module.exports =  {
    ...reactCommands,
    ...reactIndexObj
};