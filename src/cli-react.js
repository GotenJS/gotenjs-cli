const reactCommands = require("../commands/react-commands");
const reactIndex = require("../commands/react-index");

const addReactCommands = (program, functions) => {
    program
        .command("new-react <name>")
        .option("-a, --api <api>", "properties from model")
        .option("-y, --yes","default values")
        .option("-r, --redux", "architecture with Redux. Context by default")
        .description("creates a react project")
        .action(reactCommands.createProjectCommand);
		
    program
        .command("abm-react <name>")
        .option("-p, --props <props>", "properties from model", functions.collect, [])
        .option("-i, --internalModels <name>", "custom properties from model", functions.collect, [])
        .option("-a, --auth", "adds auth middlewares to the ABM. Needs run 'goten auth' previously.")
        .description("creates react abm")
        .action(reactIndex.generateABM);

    program
        .command("favicon-react <pathLocal>")
        .description("Assign a favicon to the browser, specifying a local path. Acceptable formats: ico, jpeg, jpg y png. Size: until 1000x1000")
        .action(reactIndex.addFavicon);

    program
        .command("auth-react")
        .description("add resources to login: jwt, interceptor, private routes, redirects, etc")
        .action(reactIndex.addAuthorization);

};

module.exports = {
    addReactCommands
};
